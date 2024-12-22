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
} from "@nextui-org/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [data, setData] = useState({});

  async function Login() {
    try {
      console.log(data);
      
      const response = await axios.post('http://localhost:3000/api/v1/users/signin', data);
      console.log(response);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-[400px] p-4">
        <CardHeader className="flex gap-3">
          <p className="text-2xl font-bold">Login / Signin</p>
        </CardHeader>
        <CardBody>
          {/* Input Field - Email */}
          <Input
            isClearable
            label="Name"
            name="userName"
            placeholder="Enter your name"
            type="text"
            value={data.userName}
            onChange={(event) => setData({...data,[event.target.name]:event.target.value})}
          />
          <Divider className="my-1 bg-transparent" />
          {/* Input Field - Password */}
          <Input
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            value={data.password}
            onChange={(event) => setData({...data,[event.target.name]:event.target.value})}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <button className="text-xs">HIDE</button>
                ) : (
                  <button className="text-xs">SHOW</button>
                )}
              </button>
            }
          />
          <Divider className="my-2 bg-transparent" />
          {/* Submit Button */}
          <Button color="primary" onPress={Login}>Verify Account</Button>
        </CardBody>
        <Divider className="my-2" />
        <CardFooter className="flex-col items-start">
          <p className="text-stone-300">Don't have an account?</p>
          <Link showAnchorIcon to="/signup">
            <NavLink to="/signup">Click here to create one.</NavLink>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
