import {
  Button, ModalOverlay, useDisclosure,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Text, Icon, Link
} from "@chakra-ui/react"
import { RiInformationLine } from "react-icons/ri"
/* ============ LIBS ============= */

import { IAreaCodeDTO } from "../../pages/pagesDTO/areaCodeDTO"
/* ============ COMPONENTS AND MORE ============= */

function ModalComponent({ areaCodesData }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Link onClick={onOpen} display="flex" alignItems="center" alignSelf="flex-end"  >
        <Text>Codes</Text>
        <Icon ml={2} as={RiInformationLine} fontSize="26" />
      </Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.900" >
          <ModalHeader>Área codes</ModalHeader>
          <ModalBody >


            {areaCodesData && areaCodesData.map(function (element: IAreaCodeDTO) {
              return (
                <div
                  style={{ flexDirection: "row", display: 'flex', justifyContent: 'space-between', borderWidth: 1, padding: 8, marginBottom: 8 }}
                  key={element.id} >
                  <Text>
                    Origin: {element?.origin}
                  </Text>

                  <Text>
                    Destiny: {element?.destiny}
                  </Text>

                  <Text>
                    1 Minute: {element?.valPerMinute}
                  </Text>
                </div>
              )
            })}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalComponent