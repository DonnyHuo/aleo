import { ethers } from "ethers";

export const shortStr = (address, first = 7, last = 5) => {
  if (address) {
    return address.slice(0, first) + "..." + address.slice(-last);
  } else {
    return address;
  }
};

/**
 * 读取合约方法
 * @param {*} contractAddress 合约地址
 * @param {*} abi 合约对应的 abi 文件
 * @param {*} funcName 调用的合约方法名
 * @param  {...any} params 传入的参数
 * @returns promise
 */
export async function getContract(contractAddress, abi, funcName, ...params) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, abi, provider);
  return new Promise((resolve, reject) => {
    contract[funcName](...params).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        // 合约调用错误
        console.log(err);
        reject(err);
      }
    );
  });
}

/**
 * 写入合约方法
 * @param {*} contractAddress 合约地址
 * @param {*} abi 合约对应的 abi 文件
 * @param {*} funcName 调用的合约方法名
 * @param  {...any} params 传入的参数
 * @returns promise
 */
export async function getWriteContract(
  contractAddress,
  abi,
  funcName,
  ...params
) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const contractWithSigner = contract.connect(provider.getSigner());
  return new Promise((resolve, reject) => {
    contractWithSigner[funcName](...params).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 读取合约方法（loading）
 * @param {*} contractAddress 合约地址
 * @param {*} abi 合约对应的 abi 文件
 * @param {*} funcName 调用的合约方法名
 * @param  {...any} params 传入的参数
 * @returns promise
 */
export async function getContractLoad(
  contractAddress,
  abi,
  funcName,
  ...params
) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, abi, provider);
  return new Promise((resolve, reject) => {
    contract[funcName](...params).then(
      (response) => {
        let timer = setInterval(() => {
          provider
            .getTransactionReceipt(response.hash)
            .then((receipt) => {
              if (receipt) {
                if (receipt.logs.length) {
                  setTimeout(() => {
                    resolve(response);
                  }, 2000);
                } else {
                  // 链上交互失败
                  reject(601);
                }
                clearInterval(timer);
              }
            })
            .catch((err) => {
              // 合约链上交互方法调用错误
              console.log(err);
              reject(604);
            });
        }, 1000);
      },
      (err) => {
        // 合约调用错误
        console.log(err);
        reject(605);
      }
    );
  });
}

/**
 * 写入合约方法 (loading)
 * @param {*} contractAddress 合约地址
 * @param {*} abi 合约对应的 abi 文件
 * @param {*} funcName 调用的合约方法名
 * @param  {...any} params 传入的参数
 * @returns promise
 */
export async function getWriteContractLoad(
  contractAddress,
  abi,
  funcName,
  ...params
) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const contractWithSigner = contract.connect(provider.getSigner());
  return new Promise((resolve, reject) => {
    contractWithSigner[funcName](...params).then(
      (response) => {
        let timer = setInterval(() => {
          provider
            .getTransactionReceipt(response.hash)
            .then((receipt) => {
              if (receipt) {
                if (receipt.status * 1) {
                  setTimeout(() => {
                    resolve(response);
                  }, 2000);
                } else {
                  // 链上交互失败
                  reject(601);
                }
                clearInterval(timer);
              }
            })
            .catch((err) => {
              // 合约链上交互方法调用错误
              console.log(err);
              reject(604);
            });
        }, 1000);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
