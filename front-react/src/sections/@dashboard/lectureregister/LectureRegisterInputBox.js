
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { confirmAlert } from 'react-confirm-alert'



// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { ColorManyPicker } from '../../../components/color-utils';

import { RHFTextField } from '../../../components/hook-form';
import axiosApi from '../../axiosApi';

LectureRegisterInputBox.propTypes = {
  isOpenRegister: PropTypes.bool,
  onOpenRegister: PropTypes.func,
  onCloseRegister: PropTypes.func,
};


const http = axiosApi("lectureRegisters");

export default function LectureRegisterInputBox({ isOpenRegister, onOpenRegister, onCloseRegister, onAfterSaveAuction, selectedLectinfo, selectedlectId}) {

  const [user] = useState(0);
  // 강의신청 확인창
  const confirmPopup = () => {

    onCloseRegister(); // 드로우를 닫는다.
    confirmAlert({
      title : '강의신청 확인',
      message : '강의신청을 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            lectureRegister();
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
          label: '확인',
          onClick: () => onAfterSaveAuction()

        }
      ]
    })
  }

  const lectureRegister = () => {
    console.log(selectedLectinfo);
    http({
      method: 'put',
      url: 'http://localhost:8083/lectureRegisters/registerLecture',
      data: {
        lectId : selectedlectId,
        memberId: "minseok16"
      }
    })
    .then(res => alertPopup(res.data)

    )

    .catch(err => console.log(err))
  }


  return (
    <>

      {/* <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button> */}
      <Button variant="contained" onClick={onOpenRegister} component={RouterLink} to="#" startIcon={<Iconify icon="ci:check-bold" />}>
            수강신청
      </Button>

      <Drawer
        anchor="right"
        open={isOpenRegister}
        onClose={onCloseRegister}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            강의신청정보 입력
          </Typography>
          <IconButton onClick={onCloseRegister}>
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>
        <Divider />
        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                신청자 김민석
              </Typography>
            </div>
            <div>
              <Typography variant="1" sx={{ ml: 5 }}>
                 강의 상세 내용 표시
              </Typography>
            </div>
            <div>
              <Button variant="contained" onClick={confirmPopup} component={RouterLink} to="#" startIcon={<Iconify icon="ic:outline-edit" />}>
                  신청하기
              </Button>
            </div>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
