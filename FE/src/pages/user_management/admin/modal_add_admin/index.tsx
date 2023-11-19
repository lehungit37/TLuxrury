import React, { useState } from 'react';
import { Box, Step, StepLabel, Stepper } from '@mui/material';

import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { CModalIds } from 'src/constants/modal';
import { useAppDispatch } from 'src/redux_store';
import { closeModal } from 'src/redux_store/common/modal_slice';
import { IFormAddUser } from 'src/types/user';

import Step1AddUser from './step_1';
import Step2AddUser from './step_2';
import { useStyles } from './styles';

const ModalAddAdmin = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const [activeStep, setActiveStep] = useState<number>(0);

    const [userForm, setUserForm] = useState<IFormAddUser>({
        name: '',
        email: '',
        phoneNumber: '',
        workplace: '',
        address: '',
        description: '',
    });

    const handleCloseModal = () => {
        dispatch(closeModal({ modalId: CModalIds.addUser }));
    };

    const handleChangeStep = (newStep: 1 | -1) => {
        const active = activeStep + newStep;

        setActiveStep(active);
    };

    const steps = [
        {
            id: 0,
            name: 'Thông tin chung',
            component: (
                <Step1AddUser
                    userForm={userForm}
                    setUserForm={setUserForm}
                    handleChangeStep={handleChangeStep}
                    handleCloseModal={handleCloseModal}
                />
            ),
        },
        {
            id: 1,
            name: 'Vai trò',
            component: (
                <Step2AddUser
                    userForm={userForm}
                    handleChangeStep={handleChangeStep}
                    handleCloseModal={handleCloseModal}
                />
            ),
        },
    ];

    return (
        <DialogWrapper
            isNotAutoClose
            maxWidthDialog="lg"
            classNames={classes.root}
            modalId={CModalIds.addUser}
        >
            <Box className={classes.form}>
                <Box display='block' mb={1}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((step) => {
                            return (
                                <Step key={step.id}>
                                    <StepLabel>{step.name}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>

                <Box flex={1}>
                    {steps.map((step) => {
                        if (step.id === activeStep) return step.component;
                    })}
                </Box>
            </Box>
        </DialogWrapper>
    );
};

export default ModalAddAdmin;
