import Me from "../assets/Me.jpg";
const acceptableDirectories = ["Me", "My_Projects", "My_Socials"];
const files = {
  Me: ["Infos"],
  My_Projects: ["PrimeTime"],
  My_Socials: ["Github"],
};
const contents = {
  Infos: (
    <div className="w-full flex justify-start gap-5">
      <div className="w-1/3">
        <img className="w-full" src={Me} />
      </div>
      <div className="w-full">
        <h1 className="text-xl text-blue-600">Khouas Wassim</h1>
        <h3 className=" text-lg text-green-400">
          FullStack Developer, CTF Enjoyer
        </h3>
        <p> I am the best nigger </p>
      </div>
    </div>
  ),
  PrimeTime: <div>PrimeTime</div>,
  Github: (
    <div>
      <a href="https://github.com/Mawsis" className="text-blue-600">
        My Github
      </a>
    </div>
  ),
};
export const handleCd = (actualDirectory, input) => {
  const rest = input.split(" ").slice(1).join(" ");
  if (actualDirectory !== "" && rest === "..") {
    return ["", <></>];
  }
  if (actualDirectory !== "") {
    return [
      actualDirectory,
      <div className="text-red-400">{rest} : directory not found</div>,
    ];
  }
  if (acceptableDirectories.includes(rest)) {
    return ["/" + rest, <></>];
  } else {
    return [
      actualDirectory,
      <div className="text-red-400">
        {input.split(" ")[0]}: no such file or directory: {rest}
      </div>,
    ];
  }
};

export const handleLs = (actualDirectory, input) => {
  const rest = input.split(" ").slice(1).join(" ");
  if (actualDirectory === "") {
    return (
      <div className="flex gap-4 text-blue-500">
        {acceptableDirectories.map((dir, index) => {
          return <div key={index}>{dir}</div>;
        })}
      </div>
    );
  }
  if (acceptableDirectories.includes(actualDirectory.slice(1))) {
    return (
      <div className="flex gap-4">
        {files[actualDirectory.slice(1)].map((file, index) => {
          return <div key={index}>{file}</div>;
        })}
      </div>
    );
  }
};
export const handleCat = (actualDirectory, input) => {
  const rest = input.split(" ").slice(1).join(" ");
  if (acceptableDirectories.includes(actualDirectory.slice(1))) {
    if (files[actualDirectory.slice(1)].includes(rest)) {
      return contents[rest];
    }
  } else {
    return (
      <div className="text-red-400">
        {input.split(" ")[0]}: no such file or directory: {rest}
      </div>
    );
  }
};
