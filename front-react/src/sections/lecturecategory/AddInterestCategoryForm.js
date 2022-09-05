import axios from 'axios';
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

// ----------------------------------------------------------------------

export default function AddInterestCategoryForm() {

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
    axios.post(`${process.env.REACT_APP_BACK_CATEGORY_URL}/interestCategories/registerInterestCategory`, {
      categoryName: methods.getValues().categoryName
    })
    .then(res => {
      const result = res.data;
      // console.log(result);
      if(result === -1) {
        alert('해당 분류는 이미 관심분류로 등록되어 있습니다.');
      } else {
        alert('추가되었습니다.');
        window.location.replace('/dashboard/interestCategory');
      }
    })
    .catch(err => console.log(err));
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} width="50%" margin="auto" marginTop="30px" marginBottom="30px">
        <RHFTextField name="categoryName" label="분류명"/>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting} >
            관심분류 추가
        </LoadingButton>
      </Stack>

    </FormProvider>
  );
}
