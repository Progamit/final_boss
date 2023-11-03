import React, {useRef, useState} from 'react';
import Toolbar from "../components/Toolbar.js";
import Button from "react-bootstrap/Button";
import { ArrowDown, ArrowUp, ChatDots, HeartFill, ClockHistory } from 'react-bootstrap-icons';
import ModalCreatePost from "../components/ModalCreatePost.js";
import Posts from "../components/Posts.js";
import {useDispatch, useSelector} from "react-redux";
import {setAllPosts} from "../features/info.js";
const PostsPage = () => {
    const posts = useSelector (state=> state.info.allPosts)
    const dispatch = useDispatch()
    const [sortId, setSortId] = useState(0)
    const [modalOn, setModalOn] = useState(0)


    function sortByComment() {
        let data = [...posts];  // Creates a copy of the posts array

        if (sortId === 1) {
            data.sort((a, b) => a.comments.length - b.comments.length);
            dispatch(setAllPosts(data));
            return setSortId(0);
        }
        data.sort((a, b) => b.comments.length - a.comments.length);
        dispatch(setAllPosts(data));
        setSortId(1);
    }
    function sortByLikes() {
        let data = [...posts]
        if(sortId===2) {
            data.sort((a, b) => a.likes.length - b.likes.length);
            dispatch(setAllPosts(data))
            return setSortId(0)
        }
        data.sort((a, b) => b.likes.length - a.likes.length);
        dispatch(setAllPosts(data))
        setSortId(2)

    }
    function sortByTime () {
        let data = [...posts]
        if(sortId===3) {
            data.sort((a, b) => a.date - b.date);
            dispatch(setAllPosts(data))
            return  setSortId(0)
        }
        data.sort((a, b) => b.date - a.date);
        dispatch(setAllPosts(data))
        setSortId(3)
    }



    function createPostOpen () {
        if (modalOn===1) return setModalOn(0)
        setModalOn(1)
    }




    return (
        <div className="p-0 m-0 position-relative">
            {modalOn===1 &&
                <ModalCreatePost setModalOff={setModalOn}></ModalCreatePost>
            }
            <Toolbar></Toolbar>
            <div className="d-lg-flex  ">
                <div className="mt-3 mx-5  d-lg-none justify-content-center d-flex flex-column">
                    <Button onClick={createPostOpen} variant="success fs-3" >Create Post</Button>
                </div>
                <div className="d-none  bg-body-secondary m-lg-5 mx-5 my-2  px-lg-5 py-3 w-75 d-md-flex justify-content-between align-items-start border-radius-20 ">
                    <div className=""><span className="fs-4 fw-bold">Sort By:</span></div>
                    <Button onClick={sortByComment} variant="secondary" className="px-xl-4">Comment
                        {sortId===1 ? <ArrowDown  color="white" size={25} /> : <ArrowUp  color="white" size={25} /> }
                    </Button>
                    <Button onClick={sortByLikes} variant="secondary" className="px-xl-4">Likes
                        {sortId===2 ? <ArrowDown  color="white" size={25} /> : <ArrowUp  color="white" size={25} /> }
                    </Button>
                    <Button onClick={sortByTime} variant="secondary" className="px-xl-4">Time
                        {sortId===3 ? <ArrowDown color="white" size={25} /> : <ArrowUp color="white" size={25} /> }
                    </Button>
                </div>
                <div className="d-md-none  bg-body-secondary m-lg-5 mx-5 my-2  px-lg-5 py-3 w-75 d-flex justify-content-between align-items-start border-radius-20 ">
                    <div className=""><span className="fs-4 fw-bold">Sort By:</span></div>
                    <Button onClick={sortByComment} variant="secondary" className="px-xl-4"> <ChatDots></ChatDots>
                        {sortId===1 ? <ArrowDown  color="white" size={25} /> : <ArrowUp  color="white" size={25} /> }
                    </Button>
                    <Button onClick={sortByLikes} variant="secondary" className="px-xl-4"> <HeartFill></HeartFill>
                        {sortId===2 ? <ArrowDown  color="white" size={25} /> : <ArrowUp  color="white" size={25} /> }
                    </Button>
                    <Button onClick={sortByTime} variant="secondary" className="px-xl-4"> <ClockHistory></ClockHistory>
                        {sortId===3 ? <ArrowDown color="white" size={25} /> : <ArrowUp color="white" size={25} /> }
                    </Button>
                </div>

                <div className="w-25  m-5  d-lg-flex justify-content-center d-none">
                    <Button onClick={createPostOpen} variant="success fs-3" >Create Post</Button>
                </div>
            </div>
            <div className="d-flex flex-wrap overflow-auto h-75 justify-content-center position-relative">
                {posts && posts.map((x,i)=> (
                    <Posts key={i} x={x}></Posts>))}
            </div>

        </div>
    );
};

export default PostsPage;