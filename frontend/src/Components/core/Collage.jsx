import React from "react";

export  function Collage() {
    return (
      <div className="w-full h-full grid grid-cols-4 gap-4  bg-[#dac8ba]  overflow-hidden  ">
        {/* First Column - Two Equal Divs */}
        <div className="flex flex-col gap-4">
          <div className="h-[50vh]  p-4 text-white flex items-center justify-center overflow-hidden mix-blend-multiply ">
           <img className=" object-cover" src="https://cdna.lystit.com/photos/2013/04/05/mackage-black-alvin-pea-coat-product-1-7645744-659617838.jpeg"/>
          </div>
          <div className="h-[50vh] p-4 text-white flex items-center justify-center overflow-hidden mix-blend-multiply">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wisconline.co.uk%2Fimages%2Fwebp%2FMT02-min.webp&f=1&nofb=1&ipt=866be8f0be135063f0bbbab7b1330f16180029ae0d43fb8806cc8b7003414324&ipo=images"/>
          </div>
        </div>
  
        {/* Second Column - Single Full Column */}
        <div className=" p-4 text-white flex items-center justify-center">
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd1fufvy4xao6k9.cloudfront.net%2Ffeed%2Fimg%2Fman_trenchcoat%2F614409%2F2022_AW__X2A3066-copia.png&f=1&nofb=1&ipt=cc20f61fd474c690796ef084fa994c386d27a29ad53e17993087ff27cf8e6c40&ipo=images"/>
        </div>
  
        {/* Third Column - Single Full Column */}
        <div className="h-[100vh] p-4 text-white flex items-center justify-center mix-blend-multiply ">
         < img className="h-[100vh]" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F7e%2F2c%2F66%2F7e2c66a52820b4c587a94fb2c87e3691.jpg&f=1&nofb=1&ipt=968531d4737c6f0617d4b3ec498296879bdd8b654107f0b92a98e8bf6bca70dc&ipo=images" />
        </div>
  
        {/* Fourth Column - Two Equal Divs */}
        <div className="flex flex-col gap-4">
          <div className="h-[50vh]  p-4 text-white flex items-center justify-center mix-blend-multiply overflow-hidden">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.madisonavenuemalls.com%2Fwp-content%2Fuploads%2F2016%2F06%2F2825-BLK-4634.jpg&f=1&nofb=1&ipt=ddca11f9d567ebf95f6cf5730ced9a605a7094c6490cdefd2d68238c62b50766&ipo=images"/>
          </div>
          <div className="h-[50vh]  p-4 text-white flex items-center justify-center mix-blend-multiply overflow-hidden">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.ltwebstatic.com%2Fimages3_pi%2F2024%2F02%2F19%2F0f%2F170830918264b2bb488fedb55d9cb9f6d3600bb513_thumbnail_900x.jpg&f=1&nofb=1&ipt=08c1156d36c502ce1e5f3c1ee111a1282f66b990d810c482eae0bd6d97e34e32&ipo=images"/>
          </div>
        </div>
      </div>
    );
  }