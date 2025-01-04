import Spinner from "../../components/spinner/Spinner";

export default function Login() {
  return (
    <>
      <Spinner />
      <div className="flex justify-center items-center w-[100px] h-[100px] rounded-full skeleton"></div>
    </>
  );
}
