import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
  spinner,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function AddNewStays() {
  const [data, setData] = useState({});
  const [images, setImages] = useState([]); // State to store images
  const [isSubmitting,setIsSubmitting] = useState(false)
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setImages([...event.target.files]); // Store the selected files
  };

  async function createStay() {
    setIsSubmitting(true)
    try {
      const formData = new FormData();
      console.log('This is data')
      // Append text fields
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append images
      images.forEach((image, index) => {
        formData.append(`images`, image); // 'images' is the field name for backend
      });
      console.log('this is images',images)
      console.log('this is form data',formData)
      const response = await axios.post(
        "http://localhost:3000/api/v1/stay",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`token`)}`
          },
        }
      );

      console.log(response);
      navigate('/profile/dashboard');
    } catch (error) {
      console.error(error);
      //Toast...
    } finally{
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-[400px] p-4">
        <CardHeader className="flex gap-3">
          <p className="text-2xl font-bold">Add New Stays</p>
        </CardHeader>
        <CardBody>
          {/* Input Field - Village Name */}
          <Input
            isClearable
            label="Village"
            placeholder="Enter your village name"
            type="text"
            name="village"
            value={data.village || ""}
            onChange={(event) =>
              setData({ ...data, [event.target.name]: event.target.value })
            }
          />
          <Divider className="my-1 bg-transparent" />
          {/* Input Field - Landmark */}
          <Input
            isClearable
            label="Landmark"
            placeholder="Enter your landmark name"
            type="text"
            name="landmark"
            value={data.landmark || ""}
            onChange={(event) =>
              setData({ ...data, [event.target.name]: event.target.value })
            }
          />
          <Divider className="my-1 bg-transparent" />
          {/* Input Field - Geolocation */}
          <Input
            isClearable
            label="Geolocation"
            placeholder="Enter your longitude"
            type="text"
            name="geolocation"
            value={data.geolocation || ""}
            onChange={(event) =>
              setData({ ...data, [event.target.name]: event.target.value })
            }
          />
          <Divider className="my-1 bg-transparent" />
          {/* Input Field - Rent */}
          <Input
            isClearable
            label="Rent"
            placeholder="Enter your rent"
            type="text"
            name="rent"
            value={data.rent || ""}
            onChange={(event) =>
              setData({ ...data, [event.target.name]: event.target.value })
            }
          />
          <Divider className="my-1 bg-transparent" />
          {/* Input Field - Category */}
          <Input
            isClearable
            label="Category"
            placeholder="Enter PG / Rent House"
            type="text"
            name="category"
            value={data.category || ""}
            onChange={(event) =>
              setData({ ...data, [event.target.name]: event.target.value })
            }
          />
          <Divider className="my-2 bg-transparent" />
          {/* File Upload */}
          <Input
            type="file"
            label="Upload Images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            css={{
              "input::file-selector-button": {
                mr: "$4",
                border: "none",
                background: "$primary",
                padding: "$2 $4",
                borderRadius: "$sm",
                color: "white",
                cursor: "pointer",
              },
            }}
          />
          <Divider className="my-2 bg-transparent" />
          {/* Submit Button */}
          <Button color="primary" onPress={createStay} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Create Stay'}
          </Button>
        </CardBody>
        <Divider className="my-2" />
        <CardFooter className="flex-col items-start">
          <p className="text-stone-300">You can edit the details later</p>
        </CardFooter>
      </Card>
    </div>
  );
}
