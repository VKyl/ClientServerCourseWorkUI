import WithAuth, {type WithInjectedAuth} from "../utils/context/WithAuth.tsx";


const RegisterPage = (props: WithInjectedAuth) => {

    return <></>;
}

const Page = WithAuth(RegisterPage);
export default Page;