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

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

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
            label="Email"
            placeholder="Enter your email"
            type="email"
          />
          <Divider className="my-1 bg-transparent" />
          {/* Input Field - Password */}
          <Input
            label="Password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
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
          <Button color="primary">Verify Account</Button>
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
