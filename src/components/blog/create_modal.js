import React, { useState } from "react";
import { TextField, Button, Box } from '@material-ui/core';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const btnstyle={
    marginTop: 15,
    margin:'8px 0'
};


function CreatePost({addPost, editPost, title, description, blog_id}) {
    const [newtitle, settitle] = useState(title);
    const [newbody, setbody] = useState(description);
    
    return (
        <Box sx={style}>
            <TextField 
                label='Title'
                placeholder='Enter title'
                type='text'
                value={newtitle}
                onChange={(e) => settitle(e.target.value)} 
                fullWidth required
            />
            <TextField
                label='Description'
                placeholder='Enter Description'
                type='text'
                value={newbody}
                onChange={(e) => setbody(e.target.value)} 
                fullWidth required
            />
            {
                blog_id?
                <Button 
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={btnstyle}
                    onClick={() => { editPost(blog_id, newtitle, newbody) }}
                    fullWidth>
                    Edit
                </Button>
                :
                <Button 
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={btnstyle}
                    onClick={() => { addPost(newtitle, newbody) }}
                    fullWidth>
                    Create
                </Button>
            }
        </Box>
    )
}


export default CreatePost;