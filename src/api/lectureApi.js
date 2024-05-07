import axios from 'axios';

const lectureApi = async (cpage) => {
    if (typeof cpage === 'number') {
        cpage = cpage || 1;
    } else {
        cpage = 1;
    }

    let params = new URLSearchParams({ cpage: 1, pagesize: 5 });
    try {
        const result = await axios.post('/adm/lectureRoomListjson.do', params);

        return result.data;
    } catch (error) {
        return null;
    }
};

export default lectureApi;
