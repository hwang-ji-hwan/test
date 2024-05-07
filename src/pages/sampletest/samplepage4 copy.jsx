import React, { useState, useEffect } from "react";

import "./SamplePage1.css";
import axios from "axios";
import Modal from "react-modal";

const SamplePage4 = () => {
  const [stype, setStype] = useState("");
  const [searchword, setSearchword] = useState("");
  const [useyn, setUseyn] = useState("");
  const [cpage, setCpage] = useState(1);
  const [pagesize] = useState(5);
  const [listtable, setListtable] = useState([]);
  const [totalcnt, setTotalcnt] = useState(0);

  const [dcpage, setDcpage] = useState(1);
  const [dlisttable, setDlisttable] = useState([]);
  const [dtotalcnt, setDtotalcnt] = useState(0);
  const [sgroupcode, setSgroupcode] = useState("");

  // 모달
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [igroupcode, setIgroupcode] = useState("");
  const [igroupname, setIgroupname] = useState("");
  const [inote, setInote] = useState("");
  const [iuseyn, setIuseyn] = useState("Y");
  const [modtype, setModtype] = useState(true);

  const [readonly, setReadonly] = useState(false);

  const [data, setData] = useState(0);
  const [ddata, setDdata] = useState(0);

  useEffect(() => {
    search();
    console.log("useEffect 동작");
    console.log(data);
  }, [data]);

  useEffect(() => {
    detailcodelist();
    console.log("useEffect 동작");
    console.log(ddata);
  }, [ddata]);

  const searchpage = (data) => {
    data = data || 1;
    setData(data);
    setCpage(data);
    search();
  };

  const search = async () => {
    //alert(stype + ' : ' + searchword + ' : ' + useyn)
    let params = new URLSearchParams();
    params.append("stype", stype);
    params.append("searchword", searchword);
    params.append("useyn", useyn);
    params.append("cpage", cpage);
    params.append("pagesize", pagesize);

    await axios
      .post("/system/listgroupcode", params)
      .then((res) => {
        console.log(res);

        setListtable(res.data.commcodeModel);
        setTotalcnt(res.data.totalcnt);
      })
      .catch((err) => {
        console.log("noticeUpdate catch start");
        alert(err.message);
      });
  };

  const newreg = () => {
    setModtype(true);
    setReadonly(false);
    setIgroupcode("");
    setIgroupname("");
    setInote("");
    setIuseyn("Y");

    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modify = async (e) => {
    //alert(e.target.id)

    let params = new URLSearchParams();
    params.append("groupcode", e.target.id);

    await axios
      .post("/system/selectgroupcode", params)
      .then((res) => {
        console.log(res);

        setIgroupcode(res.data.commcodeModel.group_code);
        setIgroupname(res.data.commcodeModel.group_name);
        setInote(res.data.commcodeModel.note);
        setIuseyn(res.data.commcodeModel.use_yn);
        setReadonly(true);
        setModtype(false);
        setModalIsOpen(true);
      })
      .catch((err) => {
        console.log("noticeUpdate catch start");
        alert(err.message);
      });
  };

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const save = async (proc) => {
    alert(igroupcode + " : " + igroupname + " : " + inote + " : " + iuseyn);

    let params = new URLSearchParams();
    params.append("igroupcode", igroupcode);
    params.append("igroupname", igroupname);
    params.append("inote", inote);
    params.append("iuseyn", iuseyn);

    if (modtype) {
      params.append("action", "I");
    } else {
      if (proc === "D") {
        params.append("action", "D");
      } else {
        params.append("action", "U");
      }
    }

    await axios
      .post("/system/savegroupcode", params)
      .then((res) => {
        console.log(res);

        if (res.data.result === "SUCCESS") {
          alert("저장 되었습니다.");
          closeModal();
          search();
        } else {
          alert(res.data.resultmsg);
        }
      })
      .catch((err) => {
        console.log("noticeUpdate catch start");
        alert(err.message);
      });
  };

  const del = () => {
    save("D");
  };

  const dsearchpage = (cpage) => {
    alert("dsearchpage : " + sgroupcode + " : " + cpage);
    setDcpage(cpage);
    setDdata(cpage);
    detailcodelist();
  };

  //const dsearch = (e) => {
  //  alert(e.target.id)

  //  setSgroupcode(e.target.id)
  //  detailcodelist()
  //}

  const detailcodelist = async () => {
    alert("detailcodelist : " + sgroupcode);

    if (sgroupcode === "") return;

    let params = new URLSearchParams();
    params.append("groupcode", sgroupcode);
    params.append("cpage", dcpage);
    params.append("pagesize", pagesize);

    await axios
      .post("/system/listdetailcode", params)
      .then((res) => {
        console.log(res);

        if (res.data.result === "Y") {
          setDlisttable(res.data.commcodeModel);
          setDtotalcnt(res.data.totalcnt);

          if (res.data.totalcnt === 0) {
            alert("상세 코드가 없습니다.");
          }
        } else {
          alert("조회 중 오류 발생 했습니다.");
        }
      })
      .catch((err) => {
        console.log("noticeUpdate catch start");
        alert(err.message);
      });
  };

  return (
    <>
      <div>
        <p class="conTitle">
          <span> 공통 코드 관리 </span>{" "}
          <span>
            <table cellpadding="5" cellspacing="0" className="samplePageTable">
              <tr className="samplePageTable2">
                <td className="samplePageTable3" width="50" height="25">
                  <div id="searchArea" class="d-flex justify-content-around">
                    <select
                      id="stype"
                      name="stype"
                      onChange={(e) => {
                        setStype(e.target.value);
                      }}
                    >
                      <option value="">전체</option>
                      <option value="code">코드</option>
                      <option value="name">코드명</option>
                    </select>
                    <input
                      type="text"
                      class="form-control"
                      id="searchword"
                      name="searchword"
                      onChange={(e) => {
                        setSearchword(e.target.value);
                      }}
                    />{" "}
                    사용 여부
                    <select
                      id="useyn"
                      name="useyn"
                      onChange={(e) => {
                        setUseyn(e.target.value);
                      }}
                    >
                      <option value="">전체</option>
                      <option value="Y">사용</option>
                      <option value="N">미사용</option>
                    </select>
                    <span class="fr">
                      <a
                        class="btn btn-primary mx-2"
                        id="btnSearchGrpcod"
                        name="btn"
                        onClick={search}
                      >
                        <span> 검 색 </span>{" "}
                      </a>{" "}
                      <a
                        class="btn btn-light mx-2"
                        name="modal"
                        onClick={newreg}
                      >
                        {" "}
                        <span> 신규등록 </span>{" "}
                      </a>{" "}
                    </span>{" "}
                  </div>{" "}
                </td>{" "}
              </tr>{" "}
            </table>{" "}
          </span>{" "}
        </p>{" "}
        <div style={{ marginTop: "50px" }}>
          <span>
            총건수 : {totalcnt} 현재 페이지번호 : {cpage}
          </span>
          <table class="col">
            <thead>
              <tr>
                <th scope="col"> 그룹 코드 </th>
                <th scope="col"> 그룸 명 </th> <th scope="col"> 사용 여부 </th>
                <th scope="col"></th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              {listtable.map((list, index) => {
                return (
                  <tr>
                    <td
                      id={list.group_code}
                      onClick={(e) => {
                        setSgroupcode(e.target.id);
                        setDdata(1);
                        detailcodelist();
                      }}
                    >
                      {" "}
                      {list.group_code}{" "}
                    </td>
                    <td> {list.group_name} </td>
                    <td> {list.use_yn} </td>
                    <td>
                      {" "}
                      <button id={list.group_code} onClick={modify}>
                        수정{" "}
                      </button>
                    </td>{" "}
                  </tr>
                );
              })}{" "}
            </tbody>{" "}
          </table>{" "}
          {/* 페이징 처리 */}{" "}
          <div>
            {" "}
            {[...Array(Math.ceil(totalcnt / pagesize))].map((n, index) => {
              let data = index + 1;
              return (
                <button
                  style={{ width: "30px", marginLeft: "5px" }}
                  onClick={() => searchpage(data)}
                >
                  {" "}
                  {index + 1}{" "}
                </button>
              );
            })}{" "}
          </div>{" "}
        </div>{" "}
        <div style={{ marginTop: "50px" }}>
          <span>
            총건수 : {dtotalcnt} 현재 페이지번호 : {dcpage}
          </span>
          <table class="col">
            <thead>
              <tr>
                <th scope="col"> 살세 코드 </th>
                <th scope="col"> 상세코드 명 </th>
                <th scope="col"> 사용 여부 </th>
                <th scope="col"> 등록자 </th>
                <th scope="col"></th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              {dlisttable.map((list, index) => {
                return (
                  <tr>
                    <td> {list.detail_code}</td>
                    <td> {list.detail_name} </td>
                    <td> {list.use_yn} </td>
                    <td> {list.regId} </td>
                    <td>
                      {" "}
                      <button id={list.detail_code} onClick={modify}>
                        수정{" "}
                      </button>
                    </td>{" "}
                  </tr>
                );
              })}{" "}
            </tbody>{" "}
          </table>{" "}
          {/* 페이징 처리 */}{" "}
          <div>
            {" "}
            {[...Array(Math.ceil(dtotalcnt / pagesize))].map((n, index) => {
              let data = index + 1;
              return (
                <button
                  style={{ width: "30px", marginLeft: "5px" }}
                  onClick={() => dsearchpage(data)}
                >
                  {" "}
                  {index + 1}{" "}
                </button>
              );
            })}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <Modal
        style={modalStyle}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <br />

        <table className="row modal-content">
          <tbody>
            <tr>
              <th>그룹코드</th>
              <td>
                <input
                  type="text"
                  id="group_code"
                  name="group_code"
                  value={igroupcode}
                  readOnly={readonly}
                  onChange={(e) => {
                    setIgroupcode(e.target.value);
                  }}
                />
              </td>
              <th>그룹명</th>
              <td>
                <input
                  type="text"
                  id="group_name"
                  name="group_name"
                  value={igroupname}
                  readOnly={readonly}
                  onChange={(e) => {
                    setIgroupname(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td colspan="3">
                <textarea
                  id="note"
                  name="note"
                  cols="20"
                  rows="3"
                  value={inote}
                  onChange={(e) => {
                    setInote(e.target.value);
                  }}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>사용 유무</th>
              <td colspan="3">
                사용{" "}
                <input
                  type="radio"
                  id="usey"
                  name="useyn"
                  value="Y"
                  checked={iuseyn === "Y"}
                  onChange={(e) => {
                    setIuseyn(e.target.value);
                  }}
                />
                미사용{" "}
                <input
                  type="radio"
                  id="usen"
                  name="useyn"
                  value="N"
                  checked={iuseyn === "N"}
                  onChange={(e) => {
                    setIuseyn(e.target.value);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="modal-button">
          {modtype && <button onClick={save}> 등록 </button>}
          {!modtype && <button onClick={save}> 수정 </button>}
          {!modtype && <button onClick={del}> 삭제 </button>}
          <button onClick={closeModal}> 닫기 </button>
        </div>
      </Modal>{" "}
    </>
  );
};

export default SamplePage4;
