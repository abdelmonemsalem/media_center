import axios from 'axios';

export async function GetData() {
    const response = await axios.get('http://localhost:5000/media/');
    console.log(response);
    return response;
}


export async function GetMediaItem(id) {
    const response = await axios.get('http://localhost:5000/media/' + id);
    console.log(response);
    return response;
}

export async function DeleteMediaItem(id) {
    const response = await axios.delete('http://localhost:5000/media/' + id);
    console.log(response);
    return response;
}

export async function EditItem(id, values) {
    const response = await axios.post('http://localhost:5000/media/update/' + id, values);
    console.log(response);
    return response;
}

export async function AddItem(values) {
    const response = await axios.post('http://localhost:5000/media/add/', values);
    console.log(response);
    return response;
}