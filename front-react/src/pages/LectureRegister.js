
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import moment from 'moment';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal
} from '@mui/material';
// components
import { confirmAlert } from 'react-confirm-alert'
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { LectureRegisterInputBox } from '../sections/@dashboard/lectureregister';


// import AuctionRegisterPopover from '../layouts/dashboard/AuctionRegisterPopover';


// mock
import USERLIST from '../_mock/user';

import axiosApi from '../sections/axiosApi';
// ----------------------------------------------------------------------
const httpLectRegist = axiosApi("lectureRegisters");

const TABLE_HEAD = [
  { id: 'lectId',                 label: '강의ID', alignCenter: true },
  { id: 'lectName',               label: '강의명', alignCenter: true },
  // { id: 'lectContent',            label: '강의내용', alignCenter: true },
  { id: 'lectMINUser',            label: '최소인원', alignCenter: true },
  { id: 'lectMAXUser',            label: '최대인원', alignCenter: true },
  { id: 'lectFee',                label: '강의료', alignCenter: true },
  { id: 'startLectRegistDate',    label: '강의시작', alignCenter: true },
  { id: 'endLectRegistDate',      label: '신청마감', alignCenter: true },
  { id: 'lectRegistStatus',       label: '강의상태', alignCenter: true   },
  { id: 'lectRegistCnt',          label: '신청자수', alignCenter: true   },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}




export default function User() {

  const [openRegister, setOpenRegister] = useState(false);

  const [setLECTUREREGISTERLIST] = useState([]);

  const handleOpenRegister = () => {
    if(selected.length === 0) {
      alertPopup('신청할 강의를 선택하여 주세요.');
      return;
    }
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [info, setInfo] = useState([])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  // 강의신청취소 확인창
  const confirmPopup = () => {
    console.log(selected);


    if(selected.length === 0) {
      alertPopup('취소할 강의신청내역을 선택하여 주세요.');
      return;
    }
    confirmAlert({
      title : '강의신청취소 확인',
      message : '강의신청취소를 계속 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
          }
        },
        {
          label: '아니오',
        }
      ]
    })
  }
    // 강의신청 확인창
    const alertPopup = (inputMessage) => {
      confirmAlert({
        title : '확인',
        message : inputMessage,
        buttons: [
          {
            label: '확인'
          }
        ]
      })
    }




  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);



  // const auctions = () => {

  //   const response = axios.get("http://localhost:8083/auctions");
  //   console.log(response.data);

  //  }


  // const headers = {};
  // const response = axios.get('http://localhost:8083/auctions', headers);
  // response = axios.get("http://localhost:8083/auctions");
  // console.log(response.data);
  // console.log(181818181818)


  // const response = await axios.get(this.BASE_URL + '/api/hello', data);
  // const myMethod = () => {
  //   axios.put(`http://localhost:8083/lectureRegisters/1/cancel`,
  //   {
  //     withCredentials: true // 쿠키 cors 통신 설정
  //   }).then(response => {
  //     console.log(response);
  //   })

  // }




  // const auctionCancel = () => {

  //   axios({
  //     method: 'put',
  //     url: 'http://localhost:8083/lectureRegisters/lectureRegistCancel',
  //     data: {
  //       lectIds: selected, // selected에 lectId를 담고 있다.
  //       // id: '1'
  //     }
  //   })
  //   .then(res => alertPopup('강의신청취소확인'))
  //   .catch(err => console.log(err))
  // }



  // const searchAuctionList = () => {
  //   axios.get('http://localhost:8083/lectureRegisters/searchLectureList')
  //   .then(res => setInfo(res.data))
  //   .catch(err => console.log(err));
  // }

  // useEffect(() => {
  //   axios.get('http://localhost:8083/lectureRegisters/searchLectureList')
  //   .then(res => setInfo(res.data))
  //   .catch(err => console.log(err));
  // }, [])

 
  const searchAuctionList = async () => {
    httpLectRegist.get(`/searchLectureList`,{})
    .then(res => setInfo(res.data))
    .catch(err => console.log(err))
  }


  useEffect(() => {
    httpLectRegist.get('/searchLectureList')
    .then(res => setInfo(res.data))
    .catch(err => console.log(err));
  }, [])


  const isUserNotFound = filteredUsers.length === 0;

  // console.log(info)


  const [modalVisible, setModalVisible] = useState(true)

  const closeModal = () => {
    setModalVisible(false)
  }

  const dateToString = (rawDate) => {

    if(rawDate !== null){
        return moment(rawDate).format('YYYY-MM-DD')
      }
  }




  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            수강신청
          </Typography>

{/*
          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <AuctionRegisterPopover />
          </Stack> */}
          <div>
            <LectureRegisterInputBox
              isOpenRegister={openRegister}
              onOpenRegister={handleOpenRegister}
              onCloseRegister={handleCloseRegister}
              selectedLectinfo={info}
              selectedlectId={selected}
            />


            <Button variant="contained" onClick={confirmPopup} component={RouterLink} to="#" startIcon={<Iconify icon="ooui:cancel" />}>
              신청취소
            </Button>

          </div>

        </Stack>

        <Card>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 1000 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {info.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    // const { id, lectName, lectStatus,  startAuctionDate, endAuctionDate} = row;

                    const { Id, lectId, lectContent, lectName, lectMINUser,  lectMAXUser, lectFee, startLectRegistDate, endLectRegistDate, lectRegistStatus} = row;


                    const isItemSelected = selected.indexOf(lectId) !== -1;

                    return (
                      <TableRow
                        hover
                        key={lectId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, lectId)} />
                        </TableCell>
                        <TableCell align="center">{lectId}</TableCell>
                        <TableCell align="center">{lectName}</TableCell>
                        {/* <TableCell align="center">{lectContent}</TableCell> */}
                        <TableCell align="center">{lectMINUser} 명</TableCell>
                        <TableCell align="center">{lectMAXUser} 명</TableCell>
                        <TableCell align="center">{lectFee} 원</TableCell>
                        <TableCell align="center">{dateToString(startLectRegistDate)}</TableCell>
                        <TableCell align="center">{dateToString(endLectRegistDate)}</TableCell>
                        <TableCell align="center">{lectRegistStatus}</TableCell>

                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
