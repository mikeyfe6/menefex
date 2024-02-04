import React, { useEffect, useState, useCallback } from 'react';

import { navigate } from 'gatsby';

import axios from 'axios';

import * as leadStyles from '../styles/modules/lead.module.scss';

const Form = () => {
  const [inputs, setInputs] = useState({
    name: '',
    company: '',
    email: '',
    tel: '',
    subject: 'Ik wil een offerte aanvragen',
    text: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // console.log('window is defined & active!');
      if (sessionStorage.getItem('mnfx') !== null) {
        const mnfxPrice = sessionStorage.getItem('mnfx');
        // console.log('sessionStorage (mnfx) is filled, check:', mnfxPrice);
        setInputs({ text: mnfxPrice });

        const doThis = () => {
          // console.log('sessionStorage (mnfx) removed!');
          setTimeout(() => sessionStorage.removeItem('mnfx'), 3000);
        };
        doThis();
      }
    }
  }, []);

  const handleChange = useCallback(
    (event) => {
      setInputs({
        ...inputs,
        [event.target.name]: event.target.value,
      });
    },
    [inputs],
  );

  const handleSubmit = useCallback(
    (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      event.stopPropagation();

      axios({
        url: '/.netlify/functions/sendmail',
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        data: inputs,
      })
        .then(() => navigate(form.getAttribute('action')))
        .catch((error) => console.log('POST ERROR', error));
    },

    [inputs],
  );

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className={leadStyles.leadForm}
        action="/success/"
      >
        <label htmlFor="lead_name">
          <span>*</span> Naam
        </label>
        <input
          type="text"
          name="name"
          id="lead_name"
          value={inputs.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="lead_company">
          <span>*</span> Bedrijfsnaam (optioneel)
        </label>
        <input
          type="text"
          name="company"
          id="lead_company"
          value={inputs.company}
          onChange={handleChange}
        />

        <label htmlFor="lead_email">
          <span>*</span> E-mail
        </label>
        <input
          type="email"
          name="email"
          id="lead_email"
          // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          value={inputs.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="lead_tel">
          <span>*</span> Telefoon
        </label>
        <input
          type="tel"
          name="tel"
          id="lead_tel"
          // pattern="^\+?\d*$"
          value={inputs.tel}
          onChange={handleChange}
          required
        />

        <label htmlFor="lead_subject">
          <span>*</span> Selecteer onderwerp
        </label>
        <select
          name="subject"
          id="lead_subject"
          value={inputs.subject}
          onChange={handleChange}
          required
        >
          <option value="Ik wil een offerte aanvragen">
            Offerte aanvragen
          </option>
          <option value="Ik wil een samenwerking aangaan">
            Samenwerking aangaan
          </option>
          <option value="Ik heb een vraag of opmerking">
            Vraag / Opmerking
          </option>
          <option value="Ik wil graag feedback geven">Klacht / Feedback</option>
          <option value="Ik wil graag hulp of ondersteuning">
            Hulp & Probleemoplossing
          </option>
        </select>

        <label htmlFor="lead_text">
          <span>*</span> Type uw bericht hieronder
        </label>
        <textarea
          type="text"
          name="text"
          id="lead_text"
          rows="6"
          value={inputs.text}
          onChange={handleChange}
          required
        />

        <button type="submit">Versturen</button>
      </form>
    </section>
  );
};

export default Form;
