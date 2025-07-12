
import { FaBoxOpen, FaCheckCircle, FaHeadset } from "react-icons/fa";

const Support = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="bg-light px-7 py-20 dark:bg-darkmode-light text-center rounded-md">
          <h2>Razones para elegirnos</h2>

          <div className="row justify-center gap-6 mt-14">
            <div className="col-6 md:col-5 lg:col-3">
              <div className="flex justify-center">
                <FaHeadset size={48} />
              </div>
              <h3 className="md:h4 mt-6 mb-4">24/7 Soporte Amigable</h3>
              <p>
                Nuestro equipo de soporte siempre está listo para usted los 7
                días de la semana
              </p>
            </div>

            <div className="col-6 md:col-5 lg:col-3">
              <div className="flex justify-center">
                <FaBoxOpen size={48} />
              </div>
              <h3 className="md:h4 mt-6 mb-4">Devolución fácil en 7 días</h3>
              <p>
                Cualquier falla del producto dentro de los 7 días para un cambio
                inmediato.
              </p>
            </div>

            <div className="col-6 md:col-5 lg:col-3">
              <div className="flex justify-center">
                <FaCheckCircle size={48} />
              </div>
              <h3 className="md:h4 mt-6 mb-4">Calidad Garantizada</h3>
              <p>
                Si su producto no está perfecto, devuélvalo para obtener un
                reembolso completo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
