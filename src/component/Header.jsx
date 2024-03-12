import ApproveSpender from "./ApproveSpender";

const Header = () => {
  return (
    <div className="flex justify-between items-center border-b pb-4 border-b-black">
      <div className="font-bold text-xl">PSaves</div>
      <div className="flex gap-4 items-center">
        <ApproveSpender />
        <w3m-button />
      </div>
    </div>
  );
}

export default Header