import { useFormik } from "formik";
import useLocalStorage from "use-local-storage";
import { useContext } from "react";
import ForumContext from "./ForumContext";
import styled from "styled-components";

const Styles = styled.div`
h1{
    font-weight: 300;
    margin-bottom: 20px;
    font-variant: small-caps;
}
`
export default function ForumForm() {
    const reducerValue = useContext(ForumContext);
    const [posts, setPosts] = useLocalStorage("users", "");
    const formik = useFormik({
        initialValues: {
            title: "",
            desc: "",
        },
        onSubmit(values) {
            let post = {
                title: values.title,
                desc: values.desc,
                date: Date.now(),
                user: document.querySelector("#user").value,
            };
            if (posts.length === 0) {
                setPosts([post]);
            }
            else {
                setPosts([...posts, post]);
            }
            reducerValue.dispatch({ type: "add", post: post });
        },
        validate() {
            const errors = {};
            if (formik.values.desc.length < 20) {
                errors.desc = "Description should be atleast 20 characters";
            }
            if (formik.values.title.length < 5) {
                errors.title = "Title should be atleast 5 characters";
            }
            if (formik.values.title.length > 15) {
                errors.title = "Title should be atmost 15 characters";
            }
            return errors;
        },
    });
    return (
        <Styles>
            <div className="forumForm">
                <h1 className="text-center">Forum</h1>
                <form onSubmit={formik.handleSubmit} noValidate>
                    <div>
                        <input
                            type="text"
                            name="title"
                            className="form-control col-lg-4 col-md-6 mx-auto"
                            placeholder="Enter Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                        <p className="col-lg-4 col-md-6 mx-auto text-danger">
                            {formik.errors.title ? formik.errors.title : null}
                        </p>
                    </div>
                    <div>
                        <textarea
                            className="form-control col-lg-4 col-md-6 mx-auto"
                            placeholder="Enter Description of the post"
                            name="desc"
                            value={formik.values.desc}
                            onChange={formik.handleChange}
                        />
                        <p className="col-lg-4 col-md-6 mx-auto text-danger">
                            {formik.errors.desc ? formik.errors.desc : null}
                        </p>
                    </div>
                    <div>
                        <select name="user" id="user" className="form-control col-lg-4 col-md-6 mx-auto">
                            <option value="User 1">User 1</option>
                            <option value="User 2">User 2</option>
                            <option value="User 3">User 3</option>
                        </select>
                    </div>
                    <div className=" my-4 col-lg-4 col-md-6 mx-auto">
                        <button className="btn btn-primary col-lg-3 col-md-5">Submit</button>
                    </div>
                </form>
            </div>
        </Styles>
    );
}