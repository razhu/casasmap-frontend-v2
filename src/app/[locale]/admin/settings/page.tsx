"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  useAdminSettingsQuery,
  useUpdateSettingMutation,
  useCreateSettingMutation,
  useDeleteSettingMutation,
} from "@/lib/graphql/generated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, Plus, Save, X } from "lucide-react";

export default function AdminSettingsPage() {
  const params = useParams();
  const locale = (params.locale as string) || "es";
  const { toast } = useToast();

  const { data, loading, refetch } = useAdminSettingsQuery();
  const [updateSetting] = useUpdateSettingMutation();
  const [createSetting] = useCreateSettingMutation();
  const [deleteSetting] = useDeleteSettingMutation();

  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    setting: any;
  }>({
    open: false,
    setting: null,
  });

  const [createDialog, setCreateDialog] = useState(false);
  const [processing, setProcessing] = useState(false);

  const settings = data?.settings || [];
  const categories = Array.from(new Set(settings.map((s) => s.category)));

  const handleUpdate = async (key: string, value: string) => {
    setProcessing(true);
    try {
      await updateSetting({
        variables: {
          updateSettingInput: { key, value },
        },
      });
      toast({
        title:
          locale === "es" ? "Configuración actualizada" : "Setting updated",
        description:
          locale === "es"
            ? "La configuración ha sido actualizada"
            : "Setting has been updated",
      });
      setEditDialog({ open: false, setting: null });
      refetch();
    } catch (err: any) {
      toast({
        title: locale === "es" ? "Error" : "Error",
        description:
          err?.message ||
          (locale === "es" ? "No se pudo actualizar" : "Could not update"),
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleCreate = async (formData: any) => {
    setProcessing(true);
    try {
      await createSetting({
        variables: {
          createSettingInput: formData,
        },
      });
      toast({
        title: locale === "es" ? "Configuración creada" : "Setting created",
        description:
          locale === "es"
            ? "La configuración ha sido creada"
            : "Setting has been created",
      });
      setCreateDialog(false);
      refetch();
    } catch (err: any) {
      toast({
        title: locale === "es" ? "Error" : "Error",
        description:
          err?.message ||
          (locale === "es" ? "No se pudo crear" : "Could not create"),
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (key: string) => {
    if (
      !confirm(
        locale === "es"
          ? "¿Eliminar esta configuración?"
          : "Delete this setting?"
      )
    ) {
      return;
    }

    setProcessing(true);
    try {
      await deleteSetting({ variables: { key } });
      toast({
        title: locale === "es" ? "Configuración eliminada" : "Setting deleted",
        description:
          locale === "es"
            ? "La configuración ha sido eliminada"
            : "Setting has been deleted",
      });
      refetch();
    } catch (err: any) {
      toast({
        title: locale === "es" ? "Error" : "Error",
        description:
          err?.message ||
          (locale === "es" ? "No se pudo eliminar" : "Could not delete"),
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const SettingsTable = ({
    settings: settingsList,
  }: {
    settings: typeof settings;
  }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{locale === "es" ? "Clave" : "Key"}</TableHead>
          <TableHead>{locale === "es" ? "Valor" : "Value"}</TableHead>
          <TableHead>{locale === "es" ? "Tipo" : "Type"}</TableHead>
          <TableHead>
            {locale === "es" ? "Descripción" : "Description"}
          </TableHead>
          <TableHead>{locale === "es" ? "Estado" : "Status"}</TableHead>
          <TableHead className="text-right">
            {locale === "es" ? "Acciones" : "Actions"}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {settingsList.map((setting) => (
          <TableRow key={setting.id}>
            <TableCell className="font-mono text-sm">{setting.key}</TableCell>
            <TableCell className="max-w-xs truncate">{setting.value}</TableCell>
            <TableCell>
              <Badge variant="outline">{setting.dataType}</Badge>
            </TableCell>
            <TableCell className="max-w-xs truncate text-muted-foreground text-sm">
              {setting.description || "-"}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {setting.isPublic && (
                  <Badge variant="secondary">
                    {locale === "es" ? "Público" : "Public"}
                  </Badge>
                )}
                {!setting.isEditable && (
                  <Badge variant="destructive">
                    {locale === "es" ? "Bloqueado" : "Locked"}
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell className="text-right space-x-2">
              {setting.isEditable && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditDialog({ open: true, setting })}
                    disabled={processing}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(setting.key)}
                    disabled={processing}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === "es" ? "Configuración del Sistema" : "System Settings"}
          </h1>
          <p className="text-muted-foreground">
            {locale === "es"
              ? "Gestionar configuraciones del sistema"
              : "Manage system configuration"}
          </p>
        </div>
        <Button onClick={() => setCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {locale === "es" ? "Nueva Configuración" : "New Setting"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              {locale === "es" ? "Total Configuraciones" : "Total Settings"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{settings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              {locale === "es" ? "Categorías" : "Categories"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              {locale === "es" ? "Públicas" : "Public"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {settings.filter((s) => s.isPublic).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            {locale === "es" ? "Todas" : "All"} ({settings.length})
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category} (
              {settings.filter((s) => s.category === category).length})
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardContent className="pt-6">
              <SettingsTable settings={settings} />
            </CardContent>
          </Card>
        </TabsContent>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardContent className="pt-6">
                <SettingsTable
                  settings={settings.filter((s) => s.category === category)}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Edit Dialog */}
      <EditSettingDialog
        open={editDialog.open}
        setting={editDialog.setting}
        locale={locale}
        processing={processing}
        onClose={() => setEditDialog({ open: false, setting: null })}
        onSave={handleUpdate}
      />

      {/* Create Dialog */}
      <CreateSettingDialog
        open={createDialog}
        locale={locale}
        processing={processing}
        onClose={() => setCreateDialog(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

function EditSettingDialog({
  open,
  setting,
  locale,
  processing,
  onClose,
  onSave,
}: any) {
  const [value, setValue] = useState("");

  const handleSave = () => {
    if (!value.trim()) return;
    onSave(setting.key, value);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {locale === "es" ? "Editar Configuración" : "Edit Setting"}
          </DialogTitle>
          <DialogDescription className="font-mono text-sm">
            {setting?.key}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>{locale === "es" ? "Valor" : "Value"}</Label>
            <Textarea
              value={value || setting?.value || ""}
              onChange={(e) => setValue(e.target.value)}
              rows={4}
              placeholder={
                locale === "es" ? "Ingresa el valor..." : "Enter value..."
              }
            />
          </div>
          {setting?.description && (
            <p className="text-sm text-muted-foreground">
              {setting.description}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            {locale === "es" ? "Cancelar" : "Cancel"}
          </Button>
          <Button onClick={handleSave} disabled={processing || !value.trim()}>
            <Save className="h-4 w-4 mr-2" />
            {locale === "es" ? "Guardar" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CreateSettingDialog({
  open,
  locale,
  processing,
  onClose,
  onCreate,
}: any) {
  const [formData, setFormData] = useState({
    key: "",
    value: "",
    dataType: "STRING",
    category: "",
    description: "",
    isPublic: false,
    isEditable: true,
  });

  const handleCreate = () => {
    if (!formData.key || !formData.value || !formData.category) return;
    onCreate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {locale === "es" ? "Nueva Configuración" : "New Setting"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{locale === "es" ? "Clave" : "Key"}</Label>
              <Input
                value={formData.key}
                onChange={(e) =>
                  setFormData({ ...formData, key: e.target.value })
                }
                placeholder="app.feature.enabled"
              />
            </div>
            <div>
              <Label>{locale === "es" ? "Categoría" : "Category"}</Label>
              <Input
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="general"
              />
            </div>
          </div>
          <div>
            <Label>{locale === "es" ? "Tipo de Dato" : "Data Type"}</Label>
            <Select
              value={formData.dataType}
              onValueChange={(value) =>
                setFormData({ ...formData, dataType: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="STRING">STRING</SelectItem>
                <SelectItem value="NUMBER">NUMBER</SelectItem>
                <SelectItem value="BOOLEAN">BOOLEAN</SelectItem>
                <SelectItem value="JSON">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{locale === "es" ? "Valor" : "Value"}</Label>
            <Textarea
              value={formData.value}
              onChange={(e) =>
                setFormData({ ...formData, value: e.target.value })
              }
              rows={3}
            />
          </div>
          <div>
            <Label>{locale === "es" ? "Descripción" : "Description"}</Label>
            <Input
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.isPublic}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isPublic: checked })
                }
              />
              <Label>{locale === "es" ? "Público" : "Public"}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.isEditable}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isEditable: checked })
                }
              />
              <Label>{locale === "es" ? "Editable" : "Editable"}</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {locale === "es" ? "Cancelar" : "Cancel"}
          </Button>
          <Button
            onClick={handleCreate}
            disabled={
              processing ||
              !formData.key ||
              !formData.value ||
              !formData.category
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            {locale === "es" ? "Crear" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
