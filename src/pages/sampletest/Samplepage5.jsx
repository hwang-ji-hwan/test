import Pagination from "../../components/common/Pagination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const SamplePage5 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  // const { data: lecture, refetch } = useQuery({ queryKey: ['test'], queryFn: lectureApi, refetchOnMount: true });
  const lectureApi = async (cpage) => {
    if (typeof cpage === 'number') {
      cpage = cpage || 1;
    } else {
      cpage = 1;
    }
    let params = new URLSearchParams({ cpage: 1, pagesize: 5 });
    try {
      const result = await axios.post("/adm/lectureRoomListjson.do", params);

      return result.data;
    } catch (error) {
      return null
    }
  }

  const { data: lecture, refetch } = useQuery({ queryKey: ['test'], queryFn: async () => lectureApi(), refetchOnMount: true });

  useEffect(() => {
    setTotal(lecture?.listcnt);
    refetch();
  }, [currentPage]);
  return (
    <div>
      <table className="col">
        <colgroup>
          <col width="20%" />
          <col width="15%" />
          <col width="15%" />
          <col width="40%" />
          <col width="15%" />
        </colgroup>
        <thead>
          <tr>
            <th>강의실 명</th>
            <th>강의실 크기</th>
            <th>강의실 자리수</th>
            <th>비고입니다</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lecture?.listdata.map((item) => {
            return (
              <tr key={item.lecrm_id}>
                <td
                  className="pointer-cursor"
                >
                  {item.lecrm_name}
                </td>
                <td>{item.lecrm_size}</td>
                <td>{item.lecrm_snum}</td>
                <td>{item.lecrm_note}</td>
                <td>
                  <button
                    className="btn btn-primary"
                  >
                    수정중
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPage={total}
        pageSize={5}
        blockSize={5}
        onClick={(e) => setCurrentPage(e)}
      />
    </div>
  )
}

export default SamplePage5; 