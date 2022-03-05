import { useCallback, useEffect, useState } from 'react'
import { Flex, Button, Stack, Select, Text, } from '@chakra-ui/react'
/* ============ LIBS ============= */

import InputNumber from '../components/Form/InputNumber'
import ModalComponent from '../components/Form/modal'
import { IAreaCodeDTO } from './pagesDTO/areaCodeDTO'
import { IPlansDTO } from './pagesDTO/plansDTO'
import { IUsersDTO } from './pagesDTO/usersDTO'
/* ============ COMPONENTS AND MORE ============= */

import { api } from '../services/api'
/* ============ SERVICES ============= */

function Home() {
  const [areaCodesData, setAreaCodesData] = useState<IAreaCodeDTO[]>()
  const [plansData, setPlansData] = useState<IPlansDTO[]>()
  const [dataUserResponse, setDataUserResponse] = useState<IUsersDTO>()
  const [result, setResult] = useState(false)
  const [userOrigin, setUserOrigin] = useState('')
  const [userDestiny, setUserDestiny] = useState('')
  const [time, setTime] = useState('')
  const [userNamePlan, setUserNamePlan] = useState('')

  const showResults = () => {
    setResult(true)
  }
  const sendData = async () => {

    await api
      .post('/users', {
        userOrigin,
        userDestiny,
        userNamePlan,
        time
      })
      .then(response => {
        setDataUserResponse(response.data.data)
        alert('Success! ')
        showResults()
      })
      .catch(error => {
        alert('No! we have an error in server, try again using available areacodes')
        console.log(error);

      });

  }


  const getDataAreaCode = useCallback(async () => {
    await api
      .get('/areacode')
      .then(response => {
        setAreaCodesData(response.data.data)

      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  const getDataPlans = useCallback(async () => {
    await api
      .get('/plans')
      .then(response => {
        setPlansData(response.data.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getDataAreaCode();
    getDataPlans()
  }, []);


  const handleChangeOrigin = (value: any) => {
    setUserOrigin(value)
  }

  const handleChangeDestiny = (value: any) => {
    setUserDestiny(value)
  }

  const handleChangeMinutes = (value: any) => {
    setTime(value)

  }

  const handleChange = (event) => {
    setUserNamePlan(event.target.value)
  }

  const formValidation = () => {

    if (userNamePlan != 'Select a plan') {

      if (userDestiny && userOrigin) {
        if (time && userNamePlan) {
          sendData()
        } else {
          alert("please fill in the empty fields")

        }
      } else {
        alert("please fill in the empty fields")

      }

    } else {
      alert("please fill in the empty fields")
    }
  }

  const resetForm = () => {
    setResult(false)
    setUserDestiny('')
    setUserOrigin('')
    setTime('')
    setUserNamePlan('')
  }

  const formatUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Flex
      w="100vw"
      h="100vh"
      justify="center"
      align="center">

      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >

        <ModalComponent areaCodesData={areaCodesData} />

        <Stack spacing="4" >
          <InputNumber
            value={userOrigin}
            onChange={handleChangeOrigin}
            name="origin"
            label="Origin"
            qtFieldSquare="codearea"

          />

          <InputNumber
            value={userDestiny}
            name="destiny"
            label="Destiny"
            qtFieldSquare="codearea"
            onChange={handleChangeDestiny}

          />

          <InputNumber
            value={time}
            name="minutes"
            label="Minutes"
            qtFieldSquare="minutes"
            onChange={handleChangeMinutes}

          />

          <Select
            value={userNamePlan}
            focusBorderColor="pink.500"
            backgroundColor="gray.900"
            name="plans"
            onChange={handleChange}
          >
            <option
              style={{ backgroundColor: '#181B23', }}
            >Select a plan</option>

            {plansData && plansData.map(function (value) {
              return (
                <option
                  key={value?.id}
                  style={{ backgroundColor: '#181B23', }}
                  value={value?.namePlan} >Plan: {value?.namePlan}</option>)
            })}

          </Select>
        </Stack>

        {result
          ?
          <Button
            onClick={() => {
              resetForm()
            }}
            size="lg"
            type="button"
            mt="6"
            colorScheme="pink">
            Reset
          </Button>
          :
          <Button
            onClick={() => {
              formValidation()
            }}
            size="lg"
            type="button"
            mt="6"
            colorScheme="pink">
            Simulate</Button>
        }

        {
          result &&
          <Stack mt="6">
            <div >
              <div style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}>
                <Text>Plan: {dataUserResponse?.userNamePlan}</Text>
              </div>

              <div style={{ flexDirection: "row", display: 'flex', justifyContent: 'space-between', borderWidth: 1, padding: 8, marginBottom: 8 }}>
                <Text>Origin: {dataUserResponse?.userOrigin}</Text>
                <Text>Destiny: {dataUserResponse?.userDestiny}</Text>
              </div>

              <div style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}>
                <Text>Minutes: {dataUserResponse.time}</Text>
                <Text>With plan Fale mais: {formatUSD.format(parseInt(dataUserResponse?.withPlan))}</Text>
                <Text>No plans: {formatUSD.format(parseInt(dataUserResponse?.noPlan))}</Text>
              </div>

            </div>

          </Stack>}

      </Flex>

    </Flex >
  )
}

export default Home
