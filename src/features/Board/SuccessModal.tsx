import { useRef } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Icon,
  Text,
} from '@chakra-ui/react';
import { MdClose, MdRestartAlt } from 'react-icons/md';
import { PressableButton } from '@/components';

interface SuccessModalProps {
  levelNum: number;
  hasNext: boolean;
  isOpen: boolean;
  onClose: () => void;
  handleReset: () => void;
  handleContinue: () => void;
}

const SuccessModal = ({
  levelNum,
  hasNext,
  isOpen,
  onClose,
  handleReset,
  handleContinue,
}: SuccessModalProps) => {
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Modal
        size='sm'
        motionPreset='slideInBottom'
        initialFocusRef={initialFocusRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay bg='whiteAlpha.300' backdropFilter='blur(4px)' />

        <ModalContent
          top={['40px', '48px']}
          mx={3}
          borderWidth={3}
          borderStyle='solid'
          borderColor='cyan.300'
          borderRadius='xl'
          boxShadow='2xl'
          overflow='hidden'
        >
          <ModalHeader
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            py={0}
            pr={0}
            lineHeight={1}
            fontSize='3xl'
            color='cyan.900'
          >
            Success
            <Button
              variant='ghost'
              colorScheme='cyan'
              minH={16}
              pl={4}
              pr={4}
              borderRadius={0}
              borderBottomLeftRadius='xl'
              color='cyan.900'
              onClick={onClose}
            >
              <Icon as={MdClose} boxSize={10} />
            </Button>
          </ModalHeader>

          <ModalBody fontSize='lg' mb={6}>
            {hasNext ? (
              <Text as='span'>You completed LV {levelNum}!</Text>
            ) : (
              <Text as='span'>Wow! You completed all 100 levels!</Text>
            )}
          </ModalBody>

          <ModalFooter
            justifyContent='space-between'
            pt={6}
            pb={5}
            bgGradient='linear(to-br, cyan.100, cyan.200)'
          >
            <PressableButton
              minH={14}
              pl={4}
              pr={4}
              fontSize='2xl'
              color='yellow.50'
              bg='yellow.500'
              pressableBg='yellow.700'
              onClick={handleReset}
            >
              <Icon as={MdRestartAlt} boxSize={10} />
            </PressableButton>

            <PressableButton
              innerRef={initialFocusRef}
              minH={14}
              fontSize='2xl'
              color='cyan.50'
              bg='cyan.500'
              pressableBg='cyan.700'
              onClick={handleContinue}
            >
              {hasNext ? 'Continue' : 'Close'}
            </PressableButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuccessModal;
