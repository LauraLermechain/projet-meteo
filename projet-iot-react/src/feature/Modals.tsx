import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useBreakpointValue,
  Input,
  Select,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { API_BASE_URL } from "../config";

export const AddProbeModal = () => {
  const isLargeScreen = useBreakpointValue({ base: false, md: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleCloseAndReload = () => {
    onClose();

    // Ajouter un délai d'une seconde (1000 millisecondes) avant de recharger la page
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  // Définir l'état pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    nom: "",
  });

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Effectuer la requête POST avec fetch
      const response = await fetch(`${API_BASE_URL}/ajouter-sonde`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Vérifier si la requête a réussi (status 2xx)
      if (response.ok) {
        const responseData = await response.json();
        // Traiter la réponse ici
        console.log("Réponse de la requête POST:", responseData);
      } else {
        // Gérer les erreurs ici
        console.error("Erreur lors de la requête POST:", response.statusText);
      }
    } catch (error) {
      // Gérer les erreurs ici
      console.error("Erreur lors de la requête POST:", error);
    }
  };
  return (
    <>
      <Button
        color="white"
        bg="teal.600"
        mx={2}
        rounded="lg"
        maxW={300}
        onClick={onOpen}
        fontSize={isLargeScreen ? "x-large" : "md"}
      >
        {isLargeScreen ? "Ajouter une sonde" : "Ajouter"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter une sonde</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormLabel>
                Entrez le nom de la sonde :
                <Input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                />
              </FormLabel>
              <Button mt={5} type="submit" onClick={handleCloseAndReload}>
                Envoyer
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const DeleteProbeModal = ({ dataProbe }) => {
  const isLargeScreen = useBreakpointValue({ base: false, md: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleCloseAndReload = () => {
    onClose();

    // Ajouter un délai d'une seconde (1000 millisecondes) avant de recharger la page
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const [formData, setFormData] = useState({
    id_sonde: "",
  });

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Effectuer la requête POST avec fetch
      const response = await fetch(`${API_BASE_URL}/supprimer-sonde`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Vérifier si la requête a réussi (status 2xx)
      if (response.ok) {
        const responseData = await response.json();
        // Traiter la réponse ici
        console.log("Réponse de la requête POST:", responseData);
      } else {
        // Gérer les erreurs ici
        console.error("Erreur lors de la requête POST:", response.statusText);
      }
    } catch (error) {
      // Gérer les erreurs ici
      console.error("Erreur lors de la requête POST:", error);
    }
  };
  return (
    <>
      <Button
        color="white"
        bg="teal.600"
        rounded="lg"
        mt={isLargeScreen ? 0 : 2}
        mx={2}
        maxW={300}
        onClick={onOpen}
        fontSize={isLargeScreen ? "x-large" : "md"}
      >
        {isLargeScreen ? "Supprimer une sonde" : "Supprimer"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Supprimer une sonde</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <label>
                Quelle sonde voulez vous supprimer ?
                <Select
                  name="id_sonde"
                  value={formData.id_sonde}
                  onChange={handleChange}
                >
                  {dataProbe?.map((probe, index) => (
                    <option key={index} value={probe.id_sonde}>
                      {probe.nom}
                    </option>
                  ))}
                </Select>
              </label>
              <Button mt={5} type="submit" onClick={handleCloseAndReload}>
                Envoyer
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
