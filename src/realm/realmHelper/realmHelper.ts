
import Realm from 'realm';

type SchemaType = {name: string; properties: any};

const addInDB = (dataModel: SchemaType, tableSchemaName: string, value: any) => {
    const realm = new Realm({schema:[dataModel]})
    realm.write(()=>{
        realm.create(tableSchemaName,value)
    });
    realm.close();
};

const getIntoDB = (dataModel:SchemaType,tableSchemaName:string)=>{
    const realm = new Realm({schema:[dataModel]})
    let data = JSON.parse(JSON.stringify(realm.objects(tableSchemaName)));
    realm.close();
    return data;
}

export{addInDB,getIntoDB}
