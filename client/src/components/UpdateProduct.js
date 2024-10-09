import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
	const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
		description: "",
		category: "",
		subcategory: "",
		price: "",
		netWeight: "",
		grossWeight: "",
		height: "",
		width: "",
		length: "",
		barcode: "",
		country: "",
		image: null,
  });
	const countries = [
		"Afghanistan",
		"Albania",
		"Algeria",
		"Andorra",
		"Angola",
		"Antigua and Barbuda",
		"Argentina",
		"Armenia",
		"Australia",
		"Austria",
		"Azerbaijan",
		"Bahamas",
		"Bahrain",
		"Bangladesh",
		"Barbados",
		"Belarus",
		"Belgium",
		"Belize",
		"Benin",
		"Bhutan",
		"Bolivia",
		"Bosnia and Herzegovina",
		"Botswana",
		"Brazil",
		"Brunei",
		"Bulgaria",
		"Burkina Faso",
		"Burundi",
		"Cabo Verde",
		"Cambodia",
		"Cameroon",
		"Canada",
		"Central African Republic",
		"Chad",
		"Chile",
		"China",
		"Colombia",
		"Comoros",
		"Congo",
		"Costa Rica",
		"Croatia",
		"Cuba",
		"Cyprus",
		"Czech Republic",
		"Denmark",
		"Djibouti",
		"Dominica",
		"Dominican Republic",
		"Ecuador",
		"Egypt",
		"El Salvador",
		"Equatorial Guinea",
		"Eritrea",
		"Estonia",
		"Eswatini",
		"Ethiopia",
		"Fiji",
		"Finland",
		"France",
		"Gabon",
		"Gambia",
		"Georgia",
		"Germany",
		"Ghana",
		"Greece",
		"Grenada",
		"Guatemala",
		"Guinea",
		"Guinea-Bissau",
		"Guyana",
		"Haiti",
		"Honduras",
		"Hungary",
		"Iceland",
		"India",
		"Indonesia",
		"Iran",
		"Iraq",
		"Ireland",
		"Israel",
		"Italy",
		"Jamaica",
		"Japan",
		"Jordan",
		"Kazakhstan",
		"Kenya",
		"Kiribati",
		"Korea, North",
		"Korea, South",
		"Kosovo",
		"Kuwait",
		"Kyrgyzstan",
		"Laos",
		"Latvia",
		"Lebanon",
		"Lesotho",
		"Liberia",
		"Libya",
		"Liechtenstein",
		"Lithuania",
		"Luxembourg",
		"Madagascar",
		"Malawi",
		"Malaysia",
		"Maldives",
		"Mali",
		"Malta",
		"Marshall Islands",
		"Mauritania",
		"Mauritius",
		"Mexico",
		"Micronesia",
		"Moldova",
		"Monaco",
		"Mongolia",
		"Montenegro",
		"Morocco",
		"Mozambique",
		"Myanmar",
		"Namibia",
		"Nauru",
		"Nepal",
		"Netherlands",
		"New Zealand",
		"Nicaragua",
		"Niger",
		"Nigeria",
		"North Macedonia",
		"Norway",
		"Oman",
		"Pakistan",
		"Palau",
		"Palestine",
		"Panama",
		"Papua New Guinea",
		"Paraguay",
		"Peru",
		"Philippines",
		"Poland",
		"Portugal",
		"Qatar",
		"Romania",
		"Russia",
		"Rwanda",
		"Saint Kitts and Nevis",
		"Saint Lucia",
		"Saint Vincent and the Grenadines",
		"Samoa",
		"San Marino",
		"Sao Tome and Principe",
		"Saudi Arabia",
		"Senegal",
		"Serbia",
		"Seychelles",
		"Sierra Leone",
		"Singapore",
		"Slovakia",
		"Slovenia",
		"Solomon Islands",
		"Somalia",
		"South Africa",
		"South Sudan",
		"Spain",
		"Sri Lanka",
		"Sudan",
		"Suriname",
		"Sweden",
		"Switzerland",
		"Syria",
		"Taiwan",
		"Tajikistan",
		"Tanzania",
		"Thailand",
		"Timor-Leste",
		"Togo",
		"Tonga",
		"Trinidad and Tobago",
		"Tunisia",
		"Turkey",
		"Turkmenistan",
		"Tuvalu",
		"Uganda",
		"Ukraine",
		"United Arab Emirates",
		"United Kingdom",
		"United States",
		"Uruguay",
		"Uzbekistan",
		"Vanuatu",
		"Vatican City",
		"Venezuela",
		"Vietnam",
		"Yemen",
		"Zambia",
		"Zimbabwe"
	];


  const fetchAllCategory = async (category) => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data);


      const filteredCategories = response.data.filter(cat => cat._id === category);
      if (filteredCategories.length > 0) {
        setSubcategories(filteredCategories[0].subcategories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const handleSelectCategory = (selectedCategory) => {
		setFormData({ ...formData, category: selectedCategory })
		const category = categories.filter((category) => category._id == selectedCategory )
		setSubcategories(category[0].subcategories);
	}

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setFormData({
        ...response.data,
        category: response.data.category._id, // Set category ID
        subcategory: response.data.subcategory._id, // Set sub-category ID
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
		data.append("description",formData.description);
		data.append("category", formData.category);
		data.append("subcategory", formData.subcategory);
		data.append("price", formData.price);
		data.append("netWeight", formData.netWeight);
		data.append("grossWeight", formData.grossWeight);
		data.append("height", formData.height);
		data.append("width", formData.width);
		data.append("length", formData.length);
		data.append("barcode", formData.barcode);
		data.append("country", formData.country);
		data.append("image", formData.image);

    try {
      const result = await axios.put(`http://localhost:5000/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.href = `/product-details/${id}`;
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    fetchAllCategory(formData.category);
    console.log("useEffect categories", categories)
  }, [formData.category]);

  useEffect(() => {
    fetchProductDetails();
    console.log("useEffect formData", formData);
  }, [id]);
  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  return (
    <>
      <div className='container addProductContainer'>	
        <h3 className="">Add Product</h3>
        <form className="" onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col p-2'>
            <div className="input-title">
              <span>Name</span>
            </div>
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
          </div>
        </div>
        <div className='row'>
          <div className='col p-2'>
            <div className="input-title">
              <span>Description</span>
            </div>
            <textarea
              className="form-control"
              rows="3"
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }>
            </textarea>
          </div>
        </div>
        <div className='row'>
          
          <div className='col-md-4 p-2'>
            <div className="input-title">
              <span>Category</span>
            </div>
            <select 
              className='form-control'
              value={formData.category}
              onChange={(e) => handleSelectCategory(e.target.value)}
            >
              <option value=''>Select Category </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>  

          <div className='col-md-4 p-2'>
            <div className="input-title">
              <span>Sub-category</span>
            </div>
              <select 
                className='form-control'
                value={formData.subcategory} 
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
              >
                <option value=''>Select Sub-category </option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                ))}
              </select>
          </div>  
        </div>  
        <div className='row'>
          <div className='col-md-4 p-2'>
            <div className="input-title">
              <span>Price</span>
            </div>
            <input
            className='form-control'
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
            }
            required
            />
          </div>
          <div className='col-md-4 p-2'>
            <div className="input-title">
            <span>Net Weight</span>
            </div>
            <input
            className='form-control'
            type="number"
            placeholder="Net Weight"
            value={formData.netWeight}
            onChange={(e) =>
            setFormData({ ...formData, netWeight: e.target.value })
            }
            required
            />
          </div>
          <div className='col-md-4 p-2'>
            <div className="input-title">
            <span>Gross Weight</span>
            </div>
            <input
            className='form-control'
            type="number"
            placeholder="Gross Weight"
            value={formData.grossWeight}
            onChange={(e) =>
            setFormData({ ...formData, grossWeight: e.target.value })
            }
            required
            />
          </div>
          <div className='col-md-4 p-2'>
            <div className="input-title">
              <span>Height</span>
            </div>
            <input
            className='form-control'
            type="number"
            placeholder="Height"
            value={formData.height}
            onChange={(e) =>
            setFormData({ ...formData, height: e.target.value })
            }
            required
            />
          </div>
            
          <div className='col-md-4 p-2'>
            <div className="input-title">
              <span>Width</span>
            </div>
            <input
            className='form-control'
            type="number"
            placeholder="Width"
            value={formData.width}
            onChange={(e) =>
              setFormData({ ...formData, width: e.target.value })
            }
            required
            />
          </div>
          <div className='col-md-4 p-2'>
            <div className="input-title">
              <span>Length</span>
            </div>
            <input
            className='form-control'
            type="number"
            placeholder="Length"
            value={formData.length}
            onChange={(e) =>
              setFormData({ ...formData, length: e.target.value })
            }
            required
            />
          </div>
          <div className='col-md-4 p-2'>
            <div className="input-title">
              <span>Barcode</span>
            </div>
            <input
              className='form-control'
              type="text"
              placeholder="Barcode"
              value={formData.barcode}
              onChange={(e) =>
                setFormData({ ...formData, barcode: e.target.value })
              }
            />
          </div>
          <div className='col-md-4 p-2'>
            <div className="input-title">
              <span>Country</span>
            </div>
            <select
              className='form-control'
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            >
              <option value=''>Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className='col-md-4 p-2'>
            <div className="input-title">
              <span>Image</span>
            </div>
            <input
            className='form-control'
            type="file"
            accept="image/*"
            onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
            }
            />
          </div>
        </div>
        <button className="btn btn-success" type="submit">
          Update Product
        </button>
        </form>
		  </div>

      {/* <h3 className="">Update Product</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-title">
          <span>Name:</span>
        </div>
        <input
          className="form-control"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <div className="input-title">
          <span>Description:</span>
        </div>
        <textarea
          className="form-control"
          rows="3"
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }>
        </textarea>
        <div className='row'>
          <div className='col-md-4'>
            <div className="input-title">
              <span>Category:</span>
            </div>
            <select
              className="form-control"
              value={formData.category._id}
              onChange={(e) => setFormData({ ...formData, category: { _id: e.target.value } })}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className='col-md-4'>
            <div className="input-title">
              <span>Price:</span>
            </div>
            <input
              className="form-control"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>
          <div className='col-md-4'>
            <div className="input-title">
              <span>Net Weight</span>
            </div>
            <input
            className='form-control'
            type="number"
            placeholder="Net Weight"
            value={formData.netWeight}
            onChange={(e) =>
            setFormData({ ...formData, netWeight: e.target.value })
            }
            required
            />
          </div>
          <div className='col-md-4 p-2'>
            <div className="input-title">
              <span>Gross Weight</span>
            </div>
            <input
            className='form-control'
            type="number"
            placeholder="Gross Weight"
            value={formData.grossWeight}
            onChange={(e) =>
            setFormData({ ...formData, grossWeight: e.target.value })
            }
            required
            />
          </div>
          <div className='col-md-4'>
            <div className="input-title">
              <span>Height</span>
            </div>
            <input
              className="form-control"
              type="number"
              placeholder="Height"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              required
            />
          </div>
          <div className='col-md-4'>
            <div className="input-title">
              <span>Width</span>
            </div>
            <input
              className="form-control"
              type="number"
              placeholder="Width"
              value={formData.width}
              onChange={(e) => setFormData({ ...formData, width: e.target.value })}
              required
            />
          </div>
          <div className='col-md-4'>
            <div className="input-title">
              <span>Length</span>
            </div>
            <input
              className="form-control"
              type="number"
              placeholder="Length"
              value={formData.length}
              onChange={(e) => setFormData({ ...formData, length: e.target.value })}
              required
            />
          </div>
          <div className='col-md-4'>
            <div className="input-title">
              <span>Image:</span>
            </div>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            />
          </div>
        </div>
        <button className="btn btn-success" type="submit">
          Update Product
        </button>
      </form> */}
    </>
  )
}

export default UpdateProduct;