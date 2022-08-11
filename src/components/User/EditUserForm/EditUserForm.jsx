import React, { useState } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";

import './EditUserForm.scss';

const EditUserForm = (props) => {
   const {user, setShowModal} = props;
   const [formData, setFormData] = useState(initialValue(user));
//    const [bannerUrl, setBannerUrl] = useState(
//       user?.banner ? `${API_HOST}/obtenerBanner?id=${user.id}` : null
//    );
   const [bannerFile, setBannerFile] = useState(null);
//    const [avatarUrl, setAvatarUrl] = useState(
//       user?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : null
//    );
   const [avatarFile, setAvatarFile] = useState(null);
   const [loading, setLoading] = useState(false);

   const onSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      // if (bannerFile) {
      //   await uploadBannerApi(bannerFile).catch(() => {
      //     toast.error("Error al subir el nuevo banner");
      //   });
      // }

      // if (avatarFile) {
      //   await uploadAvatarApi(avatarFile).catch(() => {
      //     toast.error("Error al subir el nuevo avatar");
      //   });
      // }

      // await updateInfoApi(formData)
      //   .then(() => {
      //     setShowModal(false);
      //   })
      //   .catch(() => {
      //     toast.error("Error al actualizar los datos");
      //   });

      // setLoading(false);
      // window.location.reload();
   };

   const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   return (
      <div className='edit-user-form'>
         <Form onSubmit={onSubmit}>
            <Form.Group>
               <Row>
                  <Col>
                     <Form.Control
                        type='text'
                        placeholder='Nombre'
                        name='nombre'
                        defaultValue={formData.nombre}
                        onChange={onChange}
                     />
                  </Col>
                  <Col>
                     <Form.Control
                        type='text'
                        placeholder='Apellidos'
                        name='apellidos'
                        defaultValue={formData.apellidos}
                        onChange={onChange}
                     />
                  </Col>
               </Row>
            </Form.Group>

            <Form.Group>
               <Form.Control
                  as='textarea'
                  row='3'
                  placeholder='Agrega tu biografía'
                  type='text'
                  name='biografia'
                  defaultValue={formData.biografia}
                  onChange={onChange}
               />
            </Form.Group>

            <Form.Group>
               <Form.Control
                  type='text'
                  placeholder='Sitio web'
                  name='sitioWeb'
                  defaultValue={formData.sitioWeb}
                  onChange={onChange}
               />
            </Form.Group>

            <Form.Group>
               <DatePicker
                  placeholder='Fecha de nacimiento'
                  locale={es}
                  selected={new Date()}
                //   onChange={(value) =>
                //      setFormData({ ...formData, fechaNacimiento: value })
                //   }
               />
            </Form.Group>

            <Button className='btn-submit' variant='primary' type='submit'>
               {loading && <Spinner animation='border' size='sm' />} Actualizar
            </Button>
         </Form>
      </div>
   );
};

function initialValue(user) {
   return {
      nombre: user.nombre || '',
      apellidos: user.apellidos || '',
      biografia: user.biografia || '',
      ubicacion: user.ubicacion || '',
      sitioWeb: user.sitioWeb || '',
      fechaNacimiento: user.fechaNacimiento || '',
   };
}

export default EditUserForm;
