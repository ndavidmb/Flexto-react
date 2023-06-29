import { DefaultContainer } from '../shared/components/DefaultContainer/DefaultContainer'
import { ContainerHeader } from '../shared/styled-components/ContainerHeader'
import { ClientRequestList } from './components/ClientRequestList'

/**
 * Va a tener dos components <ClientRequestList /> y <ClientRequestForm />
 * El form va a  crear un objeto con esta estructura:
 * Request {
 *  type: "act" | "public_area" | "access";
 *  description: string;
 *  idPublicArea: string;
 *  dateDetail: {
 *    date: Date;
 *    startHour: number; // solo si es public_area
 *    endHour: number; // solo si es public_area
 *  }
 * }
 */

export const ClientRequestsWrapper = () => {
  return <ClientRequestList></ClientRequestList>
}
