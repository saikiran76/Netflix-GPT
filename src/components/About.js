/**
 * About section component
 */
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

const About = () => {
    const navigate = useNavigate() 
    const handleClick = () =>{
        navigate('/login')

    }
    return (
      <div className="container flex flex-col">
        <div className="p-8 flex flex-col items-center">
          <h2 className="font-grace text-2xl text-red-700">Discover FlixyAI</h2>
          <h1 className="font-man font-semibold text-2xl md:text-3xl p-2 w-[400px] text-center">
            Explore, Track, and Get Movie Recommendations
          </h1>
        </div>
  
        <div className="flex-col md:flex md:flex-row lg:flex lg:flex-row">
          <div className="w-[100%] md:w-[50%] lg:w-[50%] picture-container relative">
            <div className="relative flex justify-center">
                <div className="relative">
                    <div className="image w-[50%] md:h-[18em] lg:h-[18em] overflow-hidden rounded-3xl ml-[11.5em] md:ml-[20em] lg:ml[20em] left-[3em] md:left-[5em]">
                        <img className="object-cover hover:object-scale-down" src="https://storage.googleapis.com/gweb-cloudblog-publish/images/185-gen-ai-use-cases-real-world-ai-gemini-.max-2500x2500.jpg" alt="abt"/>
                    </div>
                    <div className="rounded-2xl absolute top-[50px] md:top-[70px] right-[9em] md:right-[16em] bg-gray-100 p-3">
                        {/* <h1 className="font-man text-2xl font-semibold w-[2em]">40%</h1> */}
                        <p className="text-xs font-man w-[10em]">FlixyAI is your personal movie companion.</p>

                    </div>
                        <div className=" flex flex-row justify-start items-center gap-3.5 w-[160px] h-[51px] pl-[12.73px] pr-[30.73px] py-[12.73px] rounded-[111.54px] box-border  bg-[rgba(255,255,255,1)] shadow-[0px_15.21px_35.49px_0px_rgba(0,0,0,0.09)] absolute top-[180px] md:top-[230px] right-[10em] md:right-[15em]">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/o1i06ny9ne8-162%3A219?alt=media&token=2fe564e4-b159-4c31-b713-27b6f99f9195"
                                alt="time"
                                className=" w-[32px] h-[32px]"
                            />
                        <div className="flex flex-col justify-center items-start gap-0.5 h-[2em] box-border">
                            <p className="border-[#1c1c1cff] text-[0.5rem] leading-5 font-bold font-man uppercase">
                            More Features
                            </p>
                            <p className="border-[#828282ff] text-[0.7rem] leading-[130%]  font-man  font-[400]">
                            on the way
                            </p>
                        </div>
                    </div>

                    <div className=" flex flex-col justify-start items-start gap-2 w-[160.49px] h-[110px] pl-[30px] pr-[27.64px] pt-[25.64px] pb-[37.64px] border-[1.18px]  border-[#3d3d3dff] border-solid rounded-[25.36px] box-border  bg-[rgba(0,46,24,1)] shadow-[0px_23.63px_37.81px_0px_rgba(30,30,30,0.09)] absolute top-[240px] md:top-[230px] right-[3em]">
                        {/* <div className=" flex flex-row justify-end gap-[8px] w-[100%] box-border">
                            <p className="border-[#ffffffff] text-white  text-2xl  leading-[120%] font-man  font-[500]  tracking-[-1.9px]">
                            $0.5
                            </p>
                            <p className="text-[#a6a3a0ff] pt-2  leading-[140%]  font-man  font-[450] text-  tracking-[0.23px] uppercase">
                            million
                            </p>
                        </div> */}
                        <p className="border-[#ccccccff] text-[#e8e8e8] text-[0.6rem]  leading-[130%]  font-man  font-[500]">
                        Explore top-rated movies, add them to your bucket list, and get personalized recommendations
                        </p>
                    </div>

                    
                </div>

            </div>
            
          </div>
          <div className="w-[50%] description-container p-16 mt-16 md:mt-1">
            <h1 className="font-man font-semibold w-[12em] text-xl">
            
            Get your watchlist sorted with flixy now. Sign up Now.
            </h1>
            <div className="mt-10" onClick={handleClick}>
                <Button name="Sign up" bgColor="bg-gray-800" textColor="text-white" width="w-32" vis="block"/>
            </div>

          </div>
        </div>
      </div>
    );
  };
  
  export default About;
  

  //<div className="rounded-3xl absolute top-[230px] right-[24em] bg-gray-100 p-2 w-[8.5em] ">
//   <div className="time flex gap-2">
//   {/* <IoRocketSharp /> */}
//   <div>
//       <p className="font-bold text-sm font-man w-[em]">10 DAYS</p>
//       <p className="font-man text-xs mt-1">
//           Staff Deployment
//       </p>
//   </div>
// </div>

// </div>