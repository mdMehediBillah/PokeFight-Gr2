// import "./DetailPage.css";

import imgUrl from "../../images/homeBg.jpg";

const DetailPage = () => {
  return (
    <div
      className=" homeBg min-h-screen bg-cover bg-center bg-no-repeat w-[100%]
    "
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <h1 className="text-center pt-8 text-4xl font-semibold">
        {" "}
        Detail information about pokemone
      </h1>
    </div>
  );
};

export default DetailPage;
