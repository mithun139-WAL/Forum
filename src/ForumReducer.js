import useLocalStorage from "use-local-storage";
import ForumForm from "./ForumForm";
import ForumList from "./ForumList";
import ForumContext from "./ForumContext";
import { useReducer } from "react";
export default function Forum() {
    const [posts, setPosts] = useLocalStorage("users", "");
    const ACTIONS = {
        ADD: 'add',
        REMOVE: 'remove',
        DEL: 'del5mins',
        LOAD: 'load'
    }
    const ForumReducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.ADD:
                return { posts: [...state.posts, action.post] };

            case ACTIONS.REMOVE:
                {
                    let modifiedPosts = [];
                    state.posts.filter((post) => {
                        if (post.date !== action.date) {
                            modifiedPosts.push(post);
                        }
                    });
                    setPosts([...modifiedPosts]);
                    return { posts: modifiedPosts };
                }
            case ACTIONS.LOAD:
                return { posts: action.posts };

            case ACTIONS.DEL:
                {
                    let previousPosts = [];
                    state.posts.forEach((post) => {
                        if (Date.now() - post.date < 300000) {
                            previousPosts.push(post);
                        }
                    });
                    setPosts([...previousPosts]);
                    return { posts: previousPosts };
                }
            case ACTIONS.DEL:
                {
                    setPosts([]);
                    return { posts: [] };
                }
        }
    } 
        const [state, dispatch] = useReducer(ForumReducer, { posts: [] });
        const reducerValue = { state, dispatch };
        return (
            <div>
                <ForumContext.Provider value={reducerValue}>
                    <ForumForm />
                    <ForumList />
                </ForumContext.Provider>
            </div>
        );
    }