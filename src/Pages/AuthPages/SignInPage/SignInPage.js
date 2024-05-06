import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../../../Assets/profile.png";
import styles from "../../../Styles/AuthStyle.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { useNavigate } from "react-router-dom";
import SignInController from "../../../Controllers/AuthControllers/SignInController";

function SignInPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signInController = new SignInController();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const response = await signInController.signInUser(
          values.email,
          values.password
        );

        toast.promise(Promise.resolve(response), {
          loading: <b>Signing In...</b>,
          success: <b>SignIn Successfully...!</b>,
          error: <b>Could not SignIn. Invalid credentials</b>,
        });

        navigate("/BuyerHomePage");
      } catch (error) {
        console.error("Error during SignIn:", error);
        toast.error("Could not Sign In. Please try again.");
      }
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={avatar}
                className={styles.profile_img}
                alt="Avatar pic"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder="Email"
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="Password"
              />
              <button className={styles.btn} type="submit">
                Sign In
              </button>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a member{" "}
                <Link className="text-red-500" to="/signup">
                  Register Now!
                </Link>
              </span>
            </div>
            <div className="text-center py-1">
              <Link className="text-red-500" to="/RECOVERY">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
