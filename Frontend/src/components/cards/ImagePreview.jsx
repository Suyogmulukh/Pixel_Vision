import Loading from "../EnhancesHelp/Loading";
import PropTypes from 'prop-types';

const ImagePreview = ({ uploaded, enhanced, loading }) => {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {/* Original Image */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
                    Original Image
                </h2>
                <div className="h-80">
                    {uploaded ? (
                        <img
                            src={uploaded}
                            alt="Original"
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full bg-gray-200">
                            No Image Selected
                        </div>
                    )}
                </div>
            </div>

            {/* Enhanced Image */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <h2 className="text-xl font-semibold text-center bg-blue-800 text-white py-2">
                    Enhanced Image
                </h2>
                <div className="h-80">
                    {enhanced && !loading ? (
                        <img
                            src={enhanced}
                            alt="Enhanced"
                            className="w-full h-full object-contain"
                        />
                    ) : loading ? (
                        <div className="h-full flex items-center justify-center">
                            <Loading />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full bg-gray-200">
                            No Enhanced Image
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

ImagePreview.propTypes = {
    uploaded: PropTypes.string,
    enhanced: PropTypes.string,
    loading: PropTypes.bool
};

export default ImagePreview;