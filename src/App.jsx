import AddressSection from "./components/AddressSection/AddressSection";
import ResidentsSection from "./components/ResidentsSection/ResidentsSection";
import cl from './app.module.scss';

export default function App() {  

  return (
    <div className={cl.app}>     
      <AddressSection />
      <ResidentsSection />     
    </div>
  );
}
