import { useEffect, useState } from "react";
import MetamaskButton from "./components/MetamaskButton";
import { Contract } from "ethers";
import abi from "./abi.json";

const App = () => {
  const [signer, setSigner] = useState();
  const [contractAddress, setContractAddress] = useState("");
  const [contract, setContract] = useState();

  const onClickContract = () => {
    if (!signer || !contractAddress) return;

    setContract(new Contract(contractAddress, abi, signer));
  };

  const getNameSymbol = async () => {
    try {
      const nameResponse = await contract.name();
      const symbolResponse = await contract.symbol();

      console.log(nameResponse, symbolResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!contract) return;

    getNameSymbol();
  }, [contract]);

  return (
    <div className="min-h-screen flex flex-col justify-start items-center py-16">
      <MetamaskButton signer={signer} setSigner={setSigner} />
      {signer && (
        <div className="mt-16 flex flex-col gap-8 grow max-w-xl w-full">
          <div className="box-style text-center">
            0x77D2DAC005A952eF61AbC3D5b460bF60c805E790
          </div>
          <div className="flex w-full items-start">
            <div className="flex flex-col gap-2 grow">
              <div className="ml-1 text-lg font-bold">ERC20 연결</div>
              <input
                className="input-style"
                type="text"
                placeholder="컨트랙트 주소"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
              />
            </div>
            <button
              className="button-style ml-4 mt-9"
              onClick={onClickContract}
            >
              연결
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;