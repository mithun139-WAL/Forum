import styled from "styled-components";

const Styles = styled.div`
h4{
    font-weight: 300;
}

`
export default function ForumItem(props) {
    const post = props.post;
    const dispatch = props.dispatch;

    const removePosts = () => {
        if (window.confirm("Post wil be Deleted !!")) 
        {
            dispatch({ type: "remove", date: post.date });
        }
    };
    return (
        <Styles>
            <div className="card my-5">
                <div className="row mx-1 bg-secondary text-white mb-3">
                    <div className="col-lg-9 my-2 mx-4">
                        <p>{post.user}
                        <small className="ml-5">{new Date(post.date).toLocaleString()}</small>
                        </p>
                    </div>
                    <div className="col-lg-2 my-2">
                        <button className="btn btn-info" onClick={removePosts}>
                            Remove
                        </button>
                    </div>
                </div>
                <h4 className="mx-5">{post.title}</h4><hr className="col-1 mx-5"/>
                <p className="mx-5">{post.desc}</p>
            </div>
        </Styles>
    );
}