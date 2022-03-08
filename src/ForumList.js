import { useContext, useEffect } from "react";
import ForumContext from "./ForumContext";
import ForumItem from "./ForumItem";
import useLocalStorage from "use-local-storage";
import styled from "styled-components";

const Styles = styled.div`
h1{
    font-weight: 300;
    margin-bottom: 20px;
    font-variant: small-caps;
}
`
export default function ForumList() {
    const { state, dispatch } = useContext(ForumContext);
    const [posts, setPosts] = useLocalStorage("users", "");
    useEffect(() => {
        dispatch({ type: "load", posts: posts });
    }, []);
    const del5Mins = () => {
        dispatch({ type: "del5mins" });
    };
    return (
        <Styles>
            <div className="col-lg-8 mx-lg-5 mx-md-5 my-5">
                <div>
                    <h1 className="text-center my-2">Forum List</h1>
                    <hr className="col-lg-6 mx-auto border border-secondary" />
                    <button className="btn btn-warning col-lg-2" onClick={del5Mins}>
                        Delete 5 Mins
                    </button>
                </div>
                <div>
                    {
                        state.posts.length == 0 ?
                            (
                                <h3 className="text-center text-muted">No posts Available</h3>
                            ) : (
                                state.posts.map((post) => {
                                    return (
                                        <ForumItem
                                            post={post}
                                            key={post.date}
                                            dispatch={dispatch}
                                        />
                                    );
                                })
                            )
                    }
                </div>
            </div>
        </Styles>
    );
}