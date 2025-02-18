import './banner.css'
const Banner = () => {
    return (
        <div className='banner-item relative bg-fixed text-white 2xl:h-[700px] h-80 lg:h-[450px] bg-cover bg-top bg-no-repeat'>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4 md:px-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
                        Unite Souls, Ignite Futures
                    </h1>
                    <p className="mt-10 text-lg md:text-2xl font-medium">
                        Finding Your Perfect Match, Made Simple
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Banner;