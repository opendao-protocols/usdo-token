pragma solidity 0.5.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract USDO is ERC20, ERC20Detailed, Ownable {
    address public minter;

    event NewMinter(address indexed oldMinter, address indexed newMinter);

    constructor(uint256 initialSupply) public ERC20Detailed("USD Open Dollar", "USDO", 18) {
        _mint(_msgSender(), initialSupply);
    }

    function setMinter(address newMinter) external onlyOwner {
        _setMinterInternal(newMinter);
    }

    function _setMinterInternal(address newMinter) internal {
        emit NewMinter(minter, newMinter);
        minter = newMinter;
    }

    function mint(address account, uint256 amount) public returns (bool) {
        require(
            _msgSender() == owner() || _msgSender() == minter,
            "Unauthorized"
        );
        _mint(account, amount);
        return true;
    }

    function burn(uint256 amount) public {
        _burn(_msgSender(), amount);
    }

    function burnFrom(address account, uint256 amount) public {
        _burnFrom(account, amount);
    }
}
