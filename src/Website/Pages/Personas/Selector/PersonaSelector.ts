import Entity from "../../../../Instances/Entity";
import Page from "../../Page";

export default class PersonaSelector extends Page {
    private data: any;
    public static base_url: string = "";
    constructor(data: any, base_url?: string) {
        super(base_url || PersonaSelector.base_url)
        this.data = data;
        this.run();
    }

    private run() {
        // PERSONA SELECTOR PAGE
        this.router.get("/", async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            return this.data.server.next.render(req, res, '/Authentication/PersonaSelectionPage', { data: JSON.stringify({ user, entity }) });
        });
    }
}