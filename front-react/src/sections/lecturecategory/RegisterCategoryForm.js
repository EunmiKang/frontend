// import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
// sections
// axios 대체 - 헤더에 JWT토큰 추가 ( import 할때 위치를 아래에 두어야 할 경우가 있습니다.)
import axiosApi from '../axiosApi';


// ----------------------------------------------------------------------

// 서비스 호출 context url 설정
const httpCategory = axiosApi("lectureCategories");

export default function RegisterCategoryForm({alertPopup}) {

  const navigate = useNavigate();

  const RegisterCategorySchema = Yup.object().shape({
    categoryName: Yup.string().required('CategoryName is required'),
  });

  const defaultValues = {
    categoryName: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(RegisterCategorySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    // console.log(methods.getValues().categoryName);
    httpCategory({
      method: 'post',
      url: '/registerCategory',
      data: {
        categoryName: methods.getValues().categoryName
      }
    })
    .then(res =>{
      const result = res.data;
      // console.log(result);
      if(result === -1) {
        alertPopup('해당 분류가 이미 존재합니다.');
      } else {
        alertPopup('등록되었습니다.');
      }
    })
    .catch(err => console.log(err));
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} width="50%" margin="auto" marginTop="30px" marginBottom="30px">
        <RHFTextField name="categoryName" label="분류명"/>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting} >
            강의분류 등록
        </LoadingButton>
      </Stack>

    </FormProvider>
  );
}
