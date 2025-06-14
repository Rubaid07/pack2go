import CountUp from 'react-countup';
import { FaLeaf, FaRecycle, FaHandsHelping } from 'react-icons/fa';

const SustainableTravel = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Travel That Gives Back</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our commitment to responsible tourism in Bangladesh
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <img 
              src="https://news.cgtn.com/news/2020-10-14/Splendid-sea-of-clouds-at-Mount-Jizhuo-in-SW-China-UzWQtoTSVO/img/979fbc2f12bb4effbfda5203346e1208/979fbc2f12bb4effbfda5203346e1208-1920.jpeg" 
              alt="Sustainable travel" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Making a Positive Impact</h3>
            <p className="text-gray-600 text mb-6">
              At Pack2Go, we believe travel should benefit both visitors and local communities. 
              That's why we've partnered with grassroots organizations across Bangladesh to ensure 
              our tours support environmental conservation and community development.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <FaLeaf className="text-teal-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Eco-Friendly Practices</h4>
                  <p className="text-gray-500 text text-sm">
                    All our tours follow strict environmental guidelines to minimize plastic use and carbon footprint.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <FaRecycle className="text-teal-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Community Partnerships</h4>
                  <p className="text-gray-500 text text-sm">
                    15% of every booking goes directly to local schools and conservation projects.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <FaHandsHelping className="text-teal-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Fair Wage Guarantee</h4>
                  <p className="text-gray-500 text text-sm">
                    We ensure all guides and service providers earn living wages above industry standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-base-200 p-8 rounded-lg shadow-md max-w-7xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-3">Our Impact in Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div>
              <div className="text-3xl font-bold text-teal-600"><CountUp end={25} enableScrollSpy="true"></CountUp>+</div>
              <div className="text-gray-500">Community Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600"><CountUp end={5200} enableScrollSpy="true"></CountUp>+</div>
              <div className="text-gray-500">Trees Planted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600"><CountUp end={100} enableScrollSpy="true"></CountUp>%</div>
              <div className="text-gray-500">Plastic-Free Tours</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600">$<CountUp end={78} enableScrollSpy="true"></CountUp>K+</div>
              <div className="text-gray-500">Community Investment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SustainableTravel;