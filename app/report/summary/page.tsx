import { getCookie } from '../../../util/cookies';
import Summary from './Summary';

export default function SummaryPage() {
  // check for cookie, extract value
  const reportCookie = getCookie('reportSummary');
  const sessionCookie = getCookie('sessionToken');

  return <Summary sightingId={reportCookie!} token={sessionCookie!} />;
}
