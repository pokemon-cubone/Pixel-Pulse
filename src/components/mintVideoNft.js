import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { ethers } from "ethers";
import MintNft from "./artifacts/contracts/MinftNft.sol/MintNft.json";

const Poo_contract_address = "0x619AE6538Afb1fb0275583791F6F2D9faa278B42";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

function App() {
  var imageUri = "";
  var metdataUri = "";

  const mintCertificate = async (e) => {
    e.preventDefault();
    const nftImage = e.target.nftImage_id.files[0];
    if (nftImage == undefined) {
      alert("please select an Image");
      return;
    }
    console.log(nftImage);

    const form = new FormData();
    form.append("file", nftImage);

    const options = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/files",
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
        Authorization: "3a00a5ae-f74a-4369-820d-8da1cc435690",
      },
      data: form,
    };
    console.log(options);

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.ipfs_url);

        imageUri = response.data.ipfs_url;
      })
      .catch(function (error) {
        console.error(error);
      });

    const metadata = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/metadata",
      headers: {
        "Content-Type": "application/json",
        Authorization: "3a00a5ae-f74a-4369-820d-8da1cc435690",
      },
      data: {
        name: "Cool Panda",
        description: "Sports Players Animals",
        file_url: imageUri,
      },
    };

    await axios
      .request(metadata)
      .then(function (response) {
        console.log(response.data);
        metdataUri = response.data.metadata_uri;
      })
      .catch(function (error) {
        console.error(error);
      });

    const mintNft = new ethers.Contract(Poo_contract_address, Poo.abi, signer);
    const mintNFT = await mintNft.safeMint(
      "0xF50699109cA8AdB470dC8430Dbc36Cd7622D022f",
      metdataUri
    );
    console.log(mintNFT);
  };

  return (
    <div className="App">
      <form onSubmit={mintCertificate}>
        <input type="file" id="nftImage_id" />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
