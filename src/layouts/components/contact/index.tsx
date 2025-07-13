"use client";

import { useEffect, useState } from "react";
import { getListServices } from "@/lib/strapi";
import config from "@/config/config.json";
import { ServiceList } from "@/lib/strapi/types";
import Modal from "@/components/Modal";
import { BiLoaderAlt } from "react-icons/bi";

interface FormData {
  cname: string;
  cphone: string;
  cemail: string;
  cservice: string;
  cagend: string;
  cmessage: string;
}
const { collections } = config.strapi;

const Contacto = () => {
  //export default function Contacto() {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [servicesList, setServices] = useState<ServiceList[]>([]);
  const [formData, setFormData] = useState<FormData>({
    cname: "",
    cphone: "",
    cemail: "",
    cservice: "",
    cagend: "",
    cmessage: "",
  });

  const { contact_form_action } = config.params;

  useEffect(() => {
    const GetServices = async () => {
      setServices(await getListServices());
    };
    GetServices();
  }, []);

  const getCurrentDateTimePlaceholder = (): string => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const htmlText = `
      <h3>Nuevo contacto desde la web</h3>
      <p><strong>Nombre/Empresa:</strong> ${formData.cname}</p>
      <p><strong>Teléfono:</strong> ${formData.cphone}</p>
      <p><strong>Email:</strong> ${formData.cemail}</p>
      <p><strong>Servicio:</strong> ${formData.cservice}</p>
      <p><strong>Agenda:</strong> ${formData.cagend}</p>
      <p><strong>Mensaje:</strong> ${formData.cmessage}</p>
    `;

    const response = await fetch("/api/customer/mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ htmlText , from: formData.cemail}),
    });

    const respData = await response.json();

    setLoading(false);
    if (respData?.success) {
      setModalContent({
        title: "Mensaje enviado",
        message: "✅ Tu mensaje fue enviado con éxito.",
      });
      setModalOpen(true);
      setFormData({
        cname: "",
        cphone: "",
        cemail: "",
        cservice: "",
        cagend: "",
        cmessage: "",
      });
    } else {
      console.error(JSON.stringify(respData));

      setModalContent({
        title: "Error",
        message:
          "❌ Hubo un problema al enviar el mensaje. Intentalo más tarde.",
      });
      setModalOpen(true);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-ct">
        <div className="mx-auto lg:col-10">
          <h2 className="mb-14 text-center">Consultanos</h2>

          <form
            className="formulario border border-border dark:border-darkmode-border rounded-md p-10"
            action={contact_form_action}
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="mb-6 md:grid grid-cols-2 gap-x-8 max-md:space-y-6">
              <div>
                <label htmlFor="cname" className="form-label">
                  Nombre/Empresa <span className="text-red-500">*</span>
                </label>
                <input
                  id="cname"
                  name="cname"
                  className="form-input"
                  placeholder="Juan"
                  type="text"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="cphone" className="form-label">
                  Telefono/WhatsApp
                </label>
                <input
                  id="cphone"
                  name="cphone"
                  type="tel" // Mejora UX en móviles
                  className="form-input"
                  placeholder="1111-1111"
                  pattern="\d{4}[-\s]?\d{4}"
                  title="Formato esperado: 1111-1111 o 1111 1111"
                  value={formData.cphone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-6 md:grid grid-cols-2 gap-x-8 max-md:space-y-6">
              <div>
                <label htmlFor="cemail" className="form-label">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="cemail"
                  name="cemail"
                  className="form-input"
                  placeholder="juan.perez@email.com"
                  type="email"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-6 md:grid grid-cols-2 gap-x-8 max-md:space-y-6">
              <div>
                <label htmlFor="cservice" className="form-label">
                  ¿Qué servicio te interesa?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="cservice"
                  value={formData.cservice}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Seleccionar servicio</option>
                  {servicesList.map((servicio, idx) => (
                    <option key={idx} value={servicio.slug}>
                      {servicio.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="cagend" className="form-label">
                  ¿Querés agendar una reunión?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="cagend"
                  name="cagend"
                  className="form-input"
                  placeholder={getCurrentDateTimePlaceholder()}
                  type="datetime-local"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="cmessage" className="form-label">
                Mensaje <span className="text-red-500">*</span>
              </label>
              <textarea
                id="cmessage"
                name="cmessage"
                className="form-input"
                placeholder="Ingresa tu mensaje..."
                rows={8}
                required
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                {loading ? (
                  <BiLoaderAlt className={`animate-spin mx-auto`} size={26} />
                ) : (
                  "Enviar Mensaje"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        title={modalContent.title}
        message={modalContent.message}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default Contacto;
