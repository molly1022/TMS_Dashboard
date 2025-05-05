// src/components/board/AddColumnModal.tsx
"use client";

import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { handleError } from "@/utils/error-handling";

interface AddColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => Promise<void>;
}

export default function AddColumnModal({
  isOpen,
  onClose,
  onSubmit,
}: AddColumnModalProps) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast({
        title: "Title is required",
        status: "error",
        duration: 2000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(title);

      // Reset form
      setTitle("");
      onClose();
    } catch (error) {
      handleError(error, toast);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter list title"
              autoFocus
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Add List
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
