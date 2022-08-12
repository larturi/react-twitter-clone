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

      console.log(formData);

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
                        name='name'
                        onChange={onChange}
                        defaultValue={formData.name}
                     />
                  </Col>
                  <Col>
                     <Form.Control
                        type='text'
                        placeholder='Apellidos'
                        name='last_name'
                        onChange={onChange}
                        defaultValue={formData.last_name}
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
                  name='biography'
                  onChange={onChange}
                  defaultValue={formData.biography}
               />
            </Form.Group>

            <Form.Group>
               <Form.Control
                  type='text'
                  placeholder='Sitio web'
                  name='web_site'
                  onChange={onChange}
                  defaultValue={formData.web_site}
               />
            </Form.Group>

            <Form.Group>
               <DatePicker
                  placeholder='Fecha de nacimiento'
                  locale={es}
                  selected={new Date(formData.birth_date)}
                  onChange={(value) =>
                     setFormData({ ...formData, birth_date: value })
                  }
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
      name: user.name || '',
      last_name: user.last_name || '',
      biography: user.biography || '',
      city: user.city || '',
      web_site: user.web_site || '',
      birth_date: user.birth_date || '',
   };
}

export default EditUserForm;
