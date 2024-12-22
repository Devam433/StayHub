import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image,
    Input,
    Button,
    Select,
    SelectItem,
  } from "@nextui-org/react";
  import { useState } from "react";
  import { NavLink } from "react-router-dom";
  
  export default function AddNewStays() {
    const [isVisible, setIsVisible] = useState(false);
  
    const toggleVisibility = () => setIsVisible(!isVisible);
  
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
              label="Address"
              placeholder="Enter your village name"
              type="text"
            />
            <Divider className="my-1 bg-transparent" />
            {/* Input Field - Landmark */}
            <Input
              isClearable
              label="Landmark"
              placeholder="Enter your landmark name"
              type="text"
            />
            <Divider className="my-1 bg-transparent" />
            {/* Input Field - Geolocation */}
            <Input
              isClearable
              label="Geolocation"
              placeholder="Enter your longitude"
              type="text"
            />
            <Input
              isClearable
              placeholder="Enter your latitude"
              type="text"
            />
            <Divider className="my-1 bg-transparent" />
            {/* Input Field - Rent */}
            <Input
              isClearable
              label="Rent"
              placeholder="Enter your rent"
              type="text"
            />
            <Divider className="my-1 bg-transparent" />
            {/* Selection Area - Category */}
            <Input
              isClearable
              label="Category"
              placeholder="Enter PG / Rent House"
              type="text"
            />
            <Divider className="my-2 bg-transparent" />
            <Input
              type="file"
              label="Upload Images"
              multiple
              accept="image/*"
            //   onChange={handleImageChange}
              required
              css={{ 
                'input::file-selector-button': {
                  mr: '$4',
                  border: 'none',
                  background: '$primary',
                  padding: '$2 $4',
                  borderRadius: '$sm',
                  color: 'white',
                  cursor: 'pointer'
                }
              }}
            />
            <Divider className="my-2 bg-transparent" />
            {/* Submit Button */}
            <Button color="primary">Create Stay</Button>
          </CardBody>
          <Divider className="my-2" />
          <CardFooter className="flex-col items-start">
            <p className="text-stone-300">You can edit the details later</p>
          </CardFooter>
        </Card>
      </div>
    );
  }
  