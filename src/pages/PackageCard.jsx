import { formatDistanceToNow } from 'date-fns';
import { CiCalendarDate, CiLocationOn } from 'react-icons/ci';
import { IoTimeOutline } from 'react-icons/io5';
import { TbCoinTaka } from 'react-icons/tb';
import { Link } from 'react-router';

const PackageCard = ({ pkg }) => {
    const isExpired = new Date(pkg.departure_date) < new Date()
    return (
        <div
            className="card-theme bg-base-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
        >

            <div className="relative h-60 overflow-hidden">
                <img
                    src={pkg.image}
                    alt={pkg.tour_name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{pkg.tour_name}</h3>
                </div>
            </div>

            <div className="p-6">
                <div className='flex justify-between'>
                    <div className="flex items-center space-x-3 mb-4">
                        <img
                            src={pkg.guide_photo}
                            alt={pkg.guide_name}
                            className="w-10 h-10 rounded-full border-2 border-teal-400"
                        />
                        <div>
                            <p className="text-teal-600 dark:text-teal-400">{pkg.guide_name}</p>
                            <p className="text-xs text-gray-500 mb-2">
                                Posted {formatDistanceToNow(new Date(pkg.created_at), { addSuffix: true })}
                            </p>
                        </div>
                    </div>
                    <div>
                        {isExpired && (
                            <span className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full font-semibold">
                                Expired
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="flex items-center space-x-2">
                        <IoTimeOutline size={20} />
                        <span className="text-sm ">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <CiCalendarDate size={20} />
                        <span className="text-sm">{pkg.departure_date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <TbCoinTaka size={20} />
                        <span className="text-sm ">BDT {pkg.price}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <CiLocationOn size={20} />
                        <span className="text-sm ">{pkg.destination}</span>
                    </div>
                </div>

                <Link to={`/package/${pkg._id}`}>
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PackageCard;