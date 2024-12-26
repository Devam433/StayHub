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
import axios from "axios";

export default function Signup() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Initialize data with a default role
  const [data, setData] = useState({
    userName: '',
    phoneNumber: '',
    password: '',
    role: 'Owner', // Default role
  });

  async function Signup() {
    try {
      console.log(data);

      const response = await axios.post('http://localhost:3000/api/v1/users/signup', data);
      console.log(response);
      alert('Signup success, please login');
    } catch (error) {
      console.log('Error while signup', error);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-[400px] p-4">
        <CardHeader className="flex gap-3">
          <p className="text-2xl font-bold">Signup</p>
        </CardHeader>
        <CardBody>
          {/* Input Field - Name */}
          <Input
            isClearable
            label="Name"
            name="userName"
            placeholder="Enter your name"
            type="text"
            value={data.userName}
            onChange={(event) => setData({ ...data, [event.target.name]: event.target.value })}
          />
          <Divider className="my-1 bg-transparent" />
          {/* Input Field - PhoneNo */}
          <Input
            isClearable
            label="Phone"
            name="phoneNumber"
            placeholder="Enter your phone number"
            type="number"
            value={data.phoneNumber}
            onChange={(event) => setData({ ...data, [event.target.name]: event.target.value })}
          />
          <Divider className="my-1 bg-transparent" />
          {/* Input Field - Password */}
          <Input
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            value={data.password}
            onChange={(event) => setData({ ...data, [event.target.name]: event.target.value })}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <span className="text-xs">HIDE</span>
                ) : (
                  <span className="text-xs">SHOW</span>
                )}
              </button>
            }
          />
          <Divider className="my-1 bg-transparent" />
          {/* Selection Area - Role */}
          <select
            name="role"
            value={data.role}
            onChange={(event) => setData({ ...data, role: event.target.value })}
            required
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          >
            <option value="Owner">Owner</option>
            <option value="Tenant">Tenant</option>
          </select>
          <Divider className="my-2 bg-transparent" />
          {/* Submit Button */}
          <Button color="primary" onPress={Signup}>
            Create Account
          </Button>
        </CardBody>
        <Divider className="my-2" />
        <CardFooter className="flex-col items-start">
          <p className="text-stone-300">Have an account?</p>
          <Link showAnchorIcon to="/signup">
            <NavLink to="/login">Click here to Login.</NavLink>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
